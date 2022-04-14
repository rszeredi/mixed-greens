import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SpotifyWebApi from 'spotify-web-api-js';

import Login from '../components/Login';
import { getTokenFromUrl } from '../util/spotify';
import { useStateValue } from '../contexts/StateProvider';

const spotify = new SpotifyWebApi();

function App() {
	// const [ token, setToken ] = useState(null);
	const [ { user, token }, dispatch ] = useStateValue();

	useEffect(() => {
		const hash = getTokenFromUrl();
		const _token = hash.access_token;
		window.location.hash = ''; // don't want the token to sit in the URL for security reasons

		if (_token) {
			// setToken(_token); // move this to the state provider!
			dispatch({
				type: 'SET_TOKEN',
				token: _token
			});

			spotify.setAccessToken(_token); // give the access token to the Spotify API
			spotify
				.getMe() // returns a promise
				.then((user) => {
					console.log('>>user', user);
					dispatch({
						type: 'SET_USER',
						user: user
					});
				});
		}
	}, []);
	console.log('>>user STATE', user);
	console.log('>>token STATE', token);

	return <div className="App">{token ? <h1>Logged In!</h1> : <Login />}</div>;
}

export default App;
