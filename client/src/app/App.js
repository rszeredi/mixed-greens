import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login';
import { useEffect, useState } from 'react';
import { getTokenFromUrl } from '../util/spotify';

function App() {
	const [ token, setToken ] = useState(null);
	useEffect(() => {
		const hash = getTokenFromUrl();
		const _token = hash.access_token;
		window.location.hash = ''; // don't want the token to sit in the URL for security reasons
		console.log('>>TOKEN', _token);

		if (_token) {
			setToken(_token);
		}
	}, []);
	return <div className="App">{token ? <h1>Logged In!</h1> : <Login />}</div>;
}

export default App;
