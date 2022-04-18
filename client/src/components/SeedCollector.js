import React from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from './SearchBar';
import './SeedCollector.css';

import { useStateValue } from '../contexts/StateProvider';

import { parseRecommendations } from '../util/spotifyUtils';

function SeedCollector() {
	const [ { spotify, seeds, playlist, isFirstUse }, dispatch ] = useStateValue();

	const handleClearSeeds = () => {
		dispatch({ type: 'CLEAR_SEEDS' });
	};

	const setLoadingTemporarily = () => {
		dispatch({ type: 'SET_LOADING', value: true });
		setTimeout(() => dispatch({ type: 'SET_LOADING', value: false }), 1000);
	};

	const generatePlaylist = () => {
		setLoadingTemporarily();
		dispatch({ type: 'SET_NOT_FIRST_USE' }); // so that we don't show the instructions anymore

		if (!seeds.length) return;

		const seedArtists = seeds.filter((s) => s.type === 'artist').map((s) => s.id);
		const seedGenres = seeds.filter((s) => s.type === 'genre').map((s) => s.id);
		const seedTracks = seeds.filter((s) => s.type === 'track').map((s) => s.id);

		spotify
			.getRecommendations({
				seed_artists: seedArtists,
				seed_genres: seedGenres,
				seed_tracks: seedTracks,
				min_popularity: 50
				// target_popularity: 70
			})
			.then(
				(res) => {
					console.log('recs res.body:', res.body);
					let playlistFromSeeds = parseRecommendations(res.body);
					console.log('playlistFromSeeds', playlistFromSeeds);
					dispatch({ type: 'SET_PLAYLIST', playlist: playlistFromSeeds });
				},
				(err) => {
					console.log('Something went wrong!', err);
				}
			);
	};

	const deleteSeed = (id) => {
		dispatch({ type: 'DELETE_SEED', idToRemove: id });
	};

	const seedItems = () =>
		Array.from(seeds).map((item) => (
			<Seed key={item.id} label={item.name} id={item.id} deleteSeed={deleteSeed} />
		));
	console.log('playlist STATE: ', playlist);
	return (
		<Container className="SeedCollector d-flex flex-column justify-content-center align-items-center mt-2">
			{isFirstUse && (
				<div className="SeedCollector-description">
					Pick some seeds and let Spotify mix up a playlist for you!
				</div>
			)}
			<Container className="SeedCollector-main">
				<SearchBar />
				<Container className="SeedCollector-seed-container d-flex justify-content-center align-items-center py-4">
					{!!seeds.length && seedItems()}
				</Container>
				<Container className="d-flex justify-content-around align-items-center">
					{/* <button
					className="SeedCollector-action-btn btn btn-danger"
					onClick={handleClearSeeds}
					disabled={!seeds.length ? true : false}
				>
					Clear Seeds
				</button> */}

					{!!seeds.length && (
						<button
							className="SeedCollector-action-btn btn btn-success"
							onClick={generatePlaylist}
							disabled={!seeds.length ? true : false}
						>
							Generate Playlist!
						</button>
					)}
				</Container>
			</Container>
		</Container>
	);
}

function Seed({ label, id, deleteSeed }) {
	const handleClick = () => {
		deleteSeed(id);
	};
	return (
		<button className="SeedCollector-seed-btn btn btn-secondary btn-sm" onClick={handleClick}>
			{label}
			<i className="fa fa-xmark" />
		</button>
	);
}

export default SeedCollector;
