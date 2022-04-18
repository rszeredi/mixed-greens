import React from 'react';
import { LOGIN_URL } from '../util/spotify';
import './Login.css';

function Login() {
	return (
		<div className="Login">
			<div className="d-flex justify-content-center">
				<a className="Login-btn btn btn-success btn-lg rounded-pill" href={LOGIN_URL}>
					Log In With Spotify
				</a>
			</div>
		</div>
	);
}

export default Login;
