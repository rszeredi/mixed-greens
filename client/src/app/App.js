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
	const [ { user, token, spotify }, dispatch ] = useStateValue();
	console.log('_spotify', _spotify);

	useEffect(() => {
		dispatch({ type: 'SET_SPOTIFY', spotify: _spotify });

		const hash = getTokenFromUrl();
		const _token = hash.access_token;
		window.location.hash = ''; // don't want the token to sit in the URL for security reasons

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
				});
		}
	}, []);
	console.log('>>user STATE', user);
	console.log('>>token STATE', token);
	console.log('>>spotify STATE', spotify);

	return <div className="App">{token ? <MixedGreensApp /> : <Login />}</div>;
}

export default App;
