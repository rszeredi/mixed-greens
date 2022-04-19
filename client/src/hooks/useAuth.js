import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
	const [ accessToken, setAccessToken ] = useState();
	const [ refreshToken, setRefreshToken ] = useState();
	const [ expiresIn, setExpiresIn ] = useState();

	useEffect(
		() => {
			console.log('CODE: ', code);
			if (!code) return;
			axios
				.post('http://localhost:3001/login', { code })
				.then((res) => {
					console.log(res.data);
					window.history.pushState({}, null, '/');

					setAccessToken(res.data.accessToken);
					setRefreshToken(res.data.refreshToken);
					setExpiresIn(res.data.expiresIn);
					// setExpiresIn(61); // for testing
				})
				.catch((err) => {
					console.log(err);
					// window.location = '/';
				});
		},
		[ code ]
	);

	useEffect(
		() => {
			if (!refreshToken || !expiresIn) return;
			const interval = setInterval(() => {
				axios
					.post('http://localhost:3001/refresh', { refreshToken })
					.then((res) => {
						setAccessToken(res.data.accessToken);
						setExpiresIn(res.data.expiresIn);
						// setExpiresIn(61); // for testing
					})
					.catch((err) => {
						console.log(err);
						// window.location = '/';
					});
			}, (expiresIn - 60) * 1000); // do it one minute before expiresIn

			return () => clearInterval(interval); // if for some reason our refreshToken expires or changes before a refresh, clear timeout so we don't use an incorrect refresh token
		},
		[ refreshToken, expiresIn ]
	);

	return accessToken;
}
