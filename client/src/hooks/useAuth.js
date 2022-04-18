import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
	const [ accessToken, setAccessToken ] = useState();
	const [ resfreshToken, setResfreshToken ] = useState();
	const [ expiresIn, setExpiresIn ] = useState();

	useEffect(() => {
		console.log('CODE: ', code);
		if (!code) return;
		axios
			.post('http://localhost:3001/login', { code })
			.then((res) => {
				console.log(res.data);
				window.history.pushState({}, null, '/');

				setAccessToken(res.data.accessToken);
				setResfreshToken(res.data.resfreshToken);
				setExpiresIn(res.data.expiresIn);
			})
			.catch((err) => {
				console.log(err);
				// window.location = '/';
			});
	}, []);

	return accessToken;
}
