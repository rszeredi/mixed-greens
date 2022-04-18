import React from 'react';
import { LOGIN_URL } from '../util/spotify';
import { Container } from 'react-bootstrap';
import spotifyLogo from '../app/Spotify_Logo_RGB_White.png';
import './Login.css';

function Login() {
	return (
		<Container
			className="Login-container d-flex flex-column align-items-center py-3"
			style={{ height: '100vh' }}
		>
			<div className="MixedGreensApp-header d-flex flex-column align-items-center justify-content-center">
				<div className="MixedGreensApp-header-top d-flex align-items-center justify-content-between">
					<div className="Spotify-logo">
						<img src={spotifyLogo} alt="Spotify Logo" />
					</div>
				</div>
				<h1 className="MixedGreensApp-heading text-center my-3">Mixed Greens</h1>
			</div>
			<div className="Login-description">
				Pick some seeds (artist, tracks or genres) and we'll mix up a playlist for you!
			</div>
			<div className="d-flex justify-content-center">
				<a className="Login-btn btn btn-success btn-lg rounded-pill" href={LOGIN_URL}>
					Log In With Spotify
				</a>
			</div>
		</Container>
	);
}

export default Login;
