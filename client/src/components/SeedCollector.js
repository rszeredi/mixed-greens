import React from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from './SearchBar';
import './SeedCollector.css';

import { useStateValue } from '../contexts/StateProvider';

import { parseRecommendations } from '../util/spotifyUtils';

function SeedCollector() {
	const [ { spotify, seeds, playlist }, dispatch ] = useStateValue();

	const handleClearSeeds = () => {
		dispatch({ type: 'CLEAR_SEEDS' });
	};

	const generatePlaylist = () => {
		if (!seeds.length) return;

		const seedArtists = seeds.filter((s) => s.type === 'artist').map((s) => s.id);
		const seedGenres = seeds.filter((s) => s.type === 'genre').map((s) => s.id);
		const seedTracks = seeds.filter((s) => s.type === 'track').map((s) => s.id);
		console.log('seedArtists', seedArtists);
		console.log('seedGenres', seedGenres);
		console.log('seedTracks', seedTracks);

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
			<SearchBar />
			<Container className="SeedCollector-seed-container d-flex justify-content-center align-items-center py-4">
				{seeds && seedItems()}
			</Container>
			<Container className="d-flex justify-content-around align-items-center">
				{/* <button
					className="SeedCollector-action-btn btn btn-danger"
					onClick={handleClearSeeds}
					disabled={!seeds.length ? true : false}
				>
					Clear Seeds
				</button> */}

				<button
					className="SeedCollector-action-btn btn btn-success"
					onClick={generatePlaylist}
					disabled={!seeds.length ? true : false}
				>
					Generate Playlist!
				</button>
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
			<i class="fa fa-xmark" />
		</button>
	);
}

export default SeedCollector;
