export const AUTH_URL_BASE = 'https://accounts.spotify.com/authorize';

const DEV_MODE = process.env.NODE_ENV === 'development';

const REDIRECT_URI = DEV_MODE ? 'http://localhost:3000' : 'https://rszeredi.github.io/mixed-greens';

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

export const AUTH_URL_CODE = `${AUTH_URL_BASE}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
	'%20'
)}&response_type=code&show_dialog=true`;
