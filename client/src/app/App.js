import './App.css';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SpotifyWebApi from 'spotify-web-api-node';

import { getTokenFromUrl } from '../util/spotify';
import { useStateValue } from '../contexts/StateProvider';
import MixedGreensApp from '../components/MixedGreensApp';
import Login from '../components/Login';
import useAuth from '../hooks/useAuth';

const _spotify = new SpotifyWebApi();

const code = new URLSearchParams(window.location.search).get('code');

function App() {
	const [ { token }, dispatch ] = useStateValue();

	const _accessToken = useAuth(code);

	useEffect(
		() => {
			if (_accessToken) {
				dispatch({
					type: 'SET_TOKEN',
					token: _accessToken
				});

				_spotify.setAccessToken(_accessToken);

				dispatch({ type: 'SET_SPOTIFY', spotify: _spotify });
			}
		},
		[ _accessToken ]
	);

	return <div className="App">{token ? <MixedGreensApp /> : <Login />}</div>;
}

export default App;
