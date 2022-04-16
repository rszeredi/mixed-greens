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
		if (!seeds.size) return;

		spotify
			.getRecommendations({
				min_energy: 0.4,
				seed_artists: Array.from(seeds).map((i) => i.id),
				min_popularity: 50
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

	const seedItems = () => Array.from(seeds).map((item) => <div key={item.id}>{item.name}</div>);
	console.log('playlist STATE: ', playlist);
	return (
		<Container>
			<SearchBar />
			{seeds && <div>{seedItems()}</div>}

			<Container className="d-flex justify-content-around">
				<button
					className="SeedCollector-btn btn btn-danger mt-5"
					onClick={handleClearSeeds}
				>
					Clear Seeds
				</button>

				<button
					className="SeedCollector-btn btn btn-success mt-5"
					onClick={generatePlaylist}
					disabled={!seeds.size ? true : false}
				>
					Generate Playlist!
				</button>
			</Container>
		</Container>
	);
}

export default SeedCollector;
