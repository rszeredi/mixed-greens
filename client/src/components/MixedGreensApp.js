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

	const handleLogOut = () => {
		dispatch({ type: 'SET_IS_FIRST_USE' }); // so that we don't show the instructions anymore
		dispatch({ type: 'DELETE_TOKEN' });
	};
	//fixed-top
	return (
		<div className="MixedGreensApp d-flex flex-column" style={{ height: '100vh' }}>
			<nav className="MixedGreensApp-navbar navbar ">
				<div className="MixedGreensApp-navbar-name-logo d-flex align-items-center">
					<a
						href="https://www.spotify.com"
						className="MixedGreensApp-navbar-item Spotify-logo"
					>
						<img src={spotifyLogo} alt="Spotify Logo" />
					</a>
					<div className="MixedGreensApp-navbar-item MixedGreensApp-heading text-center">
						Mixed Greens
					</div>
				</div>
				<div className="MixedGreensApp-navbar-buttons d-flex align-items-center justify-content-between">
					<a
						href="https://www.spotify.com"
						className="MixedGreensApp-navbar-item MixedGreensApp-navbar-item-btn"
					>
						GET SPOTIFY
					</a>
					<div
						className="MixedGreensApp-navbar-item MixedGreensApp-navbar-item-btn"
						onClick={handleLogOut}
					>
						LOGOUT
					</div>
				</div>
			</nav>

			{token ? (
				// <div className="MixedGreensApp d-flex flex-column align-items-center">
				<Container className="MixedGreensApp-container d-flex flex-column align-items-center py-3">
					<SeedCollector />
					<Playlist />
					<Controls />
				</Container>
			) : (
				<Login />
			)}
		</div>
	);
}

export default MixedGreensApp;
