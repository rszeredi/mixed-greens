import React from 'react';
import { Container } from 'react-bootstrap';
import Controls from './Controls';

import './MixedGreensApp.css';
import Playlist from './Playlist';
import SeedCollector from './SeedCollector';

import spotifyLogo from '../app/Spotify_Logo_RGB_White.png';
import saladGif from '../salad.gif';
import { useStateValue } from '../contexts/StateProvider';

function MixedGreensApp({ loadingApp }) {
	const [ { token, isValidUser, loadingPlaylist }, dispatch ] = useStateValue();

	const handleLogOut = () => {
		dispatch({ type: 'SET_IS_FIRST_USE' }); // so that we don't show the instructions anymore
		dispatch({ type: 'DELETE_TOKEN_AND_CODE' });
		dispatch({ type: 'UNSET_USER' });
	};

	const handleCloseDropDown = () => {
		dispatch({ type: 'HIDE_SEARCH_DROPDOWN' });
	};
	//fixed-top

	const loadingGif = (
		<div className="m-5 m-auto">
			<img src={saladGif} style={{ width: '80px', height: '80px' }} />
		</div>
	);
	let appContent;
	if (loadingApp) {
		appContent = loadingGif;
	} else if (token && isValidUser) {
		appContent = (
			// <div className="MixedGreensApp d-flex flex-column align-items-center">
			<Container className="MixedGreensApp-container d-flex flex-column align-items-center py-3">
				<SeedCollector />
				{loadingPlaylist && { loadingGif }}
				<Playlist />
				<Controls />
			</Container>
		);
	} else
		appContent = (
			<div className="MixedGreensApp-user-not-valid d-flex align-items-center justify-content-center mt-5">
				<p>Sorry! Your account is not registered for this app. Please contact Ria :)</p>
			</div>
		);
	return (
		<div
			className="MixedGreensApp d-flex flex-column"
			style={{ height: '100vh' }}
			onClick={handleCloseDropDown}
		>
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

			{appContent}
		</div>
	);
}

export default MixedGreensApp;
