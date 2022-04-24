import './App.css';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SpotifyWebApi from 'spotify-web-api-node';

import { useStateValue } from '../contexts/StateProvider';
import MixedGreensApp from '../components/MixedGreensApp';
import Login from '../components/Login';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const _spotify = new SpotifyWebApi();

const code = new URLSearchParams(window.location.search).get('code');

function App() {
	const [ { token }, dispatch ] = useStateValue();

	const _accessToken = useAuth(code);

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
			}
		},
		[ _accessToken ]
	);

	return <div className="App">{token ? <MixedGreensApp /> : <Login />}</div>;
}

export default App;
