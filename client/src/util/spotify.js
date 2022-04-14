export const AUTH_URL = 'https://accounts.spotify.com/authorize';

const REDIRECT_URI = 'http://localhost:3000';

const CLIENT_ID = 'ce3a4e00e98a45ec8027b9b925817651';

const scopes = [
	'streaming',
	'user-read-email',
	'user-read-private',
	'user-library-read',
	'user-library-modify',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-top-read'
];

export const LOGIN_URL = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
	'%20'
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
	const uriComponents = window.location.hash.substring(1).split('&');
	// return Object.fromEntries(
	// 	uriComponents.map((i) => i.split('=')).map(([ k, v ]) => [ k, decodeURIComponent(v) ])
	// );

	// alternative:
	return uriComponents.reduce((initial, item) => {
		let parts = item.split('=');
		initial[parts[0]] = decodeURIComponent(parts[1]);
		return initial;
	}, {});
};
