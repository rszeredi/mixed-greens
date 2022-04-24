import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SpotifyWebApi from 'spotify-web-api-node';

import { useStateValue } from '../contexts/StateProvider';
import MixedGreensApp from '../components/MixedGreensApp';
import Login from '../components/Login';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const _spotify = new SpotifyWebApi();

const _code = new URLSearchParams(window.location.search).get('code');

function App() {
	const [ loadingApp, setLoadingApp ] = useState(false);
	const [ { token, code, user }, dispatch ] = useStateValue();

	useEffect(
		() => {
			dispatch({ type: 'SET_CODE', code: _code });
			if (_code && !user) setLoadingApp(true);
		},
		[ _code ]
	);

	const _accessToken = useAuth(_code);

	// create custom axios call because _spotify.getMe() doesn't seem to catch the error properly
	const getUser = async (token) => {
		const URL_ME = 'https://api.spotify.com/v1/me';
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};

		axios
			.get(URL_ME, { headers })
			.then((user) => {
				console.log('user: ', user);
				dispatch({
					type: 'SET_USER',
					user: user
				});
			})
			.catch((err) => {
				dispatch({
					type: 'SET_INVALID_USER'
				});
				console.log(err);
			});
	};

	useEffect(
		() => {
			if (_accessToken) {
				dispatch({
					type: 'SET_TOKEN',
					token: _accessToken
				});

				_spotify.setAccessToken(_accessToken);

				getUser(_accessToken);

				dispatch({ type: 'SET_SPOTIFY', spotify: _spotify });

				setTimeout(() => setLoadingApp(false), 1000);
			}
		},
		[ _accessToken ]
	);

	return (
		<div className="App">{code ? <MixedGreensApp loadingApp={loadingApp} /> : <Login />}</div>
	);
}

export default App;
