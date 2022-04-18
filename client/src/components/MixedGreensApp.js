import React from 'react';
import { Container } from 'react-bootstrap';
import Controls from './Controls';

import './MixedGreensApp.css';
import Playlist from './Playlist';
import SeedCollector from './SeedCollector';
import Login from '../components/Login';

import spotifyLogo from '../app/Spotify_Logo_RGB_White.png';
import { useStateValue } from '../contexts/StateProvider';

function MixedGreensApp() {
	const [ { token }, dispatch ] = useStateValue();

	const deleteToken = () => {
		dispatch({ type: 'DELETE_TOKEN' });
	};

	return (
		<Container
			className="MixedGreensApp-container d-flex flex-column align-items-center py-3"
			style={{ height: '100vh' }}
		>
			<div className="MixedGreensApp-header d-flex flex-column align-items-center justify-content-center">
				<div className="MixedGreensApp-header-top d-flex align-items-center justify-content-between">
					<div className="Spotify-logo">
						<img src={spotifyLogo} alt="Spotify Logo" />
					</div>
					<button
						className="Logout-btn btn btn-secondary btn-lg rounded-pill"
						onClick={deleteToken}
					>
						LOGOUT
					</button>
				</div>
				<h1 className="MixedGreensApp-heading text-center my-3">Mixed Greens</h1>
			</div>

			{token ? (
				<div className="MixedGreensApp d-flex flex-column align-items-center">
					<SeedCollector />
					<Playlist />
					<Controls />
				</div>
			) : (
				<Login />
			)}
		</Container>
	);
}

export default MixedGreensApp;
