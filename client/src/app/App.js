import './App.css';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SpotifyWebApi from 'spotify-web-api-node';

import Login from '../components/Login';
import { getTokenFromUrl } from '../util/spotify';
import { useStateValue } from '../contexts/StateProvider';
import MixedGreensApp from '../components/MixedGreensApp';

const _spotify = new SpotifyWebApi();

function App() {
	// const [ token, setToken ] = useState(null);
	const [ { spotify, user, token }, dispatch ] = useStateValue();
	console.log('_spotify', _spotify);

	useEffect(() => {
		const hash = getTokenFromUrl();
		const _token = hash.access_token;
		window.location.hash = ''; // don't want the token to sit in the URL for security reasons

		// TODO: remove: for debugging - check if we already hard-coded a token
		if (token) {
			_spotify.setAccessToken(token);
			// console.log('getAccessToken', _spotify.getAccessToken());
			console.log('>>user222');
			_spotify
				.getMe() // returns a promise
				.then(
					(user) => {
						console.log('>>user222', user);
						dispatch({
							type: 'SET_USER',
							user: user
						});
					},
					(err) => {
						console.log('>>user222 error with getme:', err);
					}
				)
				.catch((err) => {
					console.log('>>user222 error with getme:', err);
				});
		}

		if (_token) {
			// setToken(_token); // move this to the state provider!
			dispatch({
				type: 'SET_TOKEN',
				token: _token
			});

			_spotify.setAccessToken(_token); // give the access token to the Spotify API
			_spotify
				.getMe() // returns a promise
				.then((user) => {
					console.log('>>user', user);
					dispatch({
						type: 'SET_USER',
						user: user
					});
				})
				.catch((err) => {
					console.log('error with getme:', err);
				});
		}

		dispatch({ type: 'SET_SPOTIFY', spotify: _spotify });
	}, []);
	console.log('>>user STATE', user);
	console.log('>>token STATE', token);
	console.log('>>spotify STATE', spotify);

	return <div className="App">{token ? <MixedGreensApp /> : <Login />}</div>;
}

export default App;
