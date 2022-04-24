require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const IN_DEV_MODE = process.argv[2] === 'dev';
const REDIRECT_URI = IN_DEV_MODE
	? 'http://localhost:3000'
	: 'https://rszeredi.github.io/mixed-greens';

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
	const code = req.body.code;
	// if (IN_DEV_MODE) console.log('CODE: ', code);
	console.log('REDIRECT_URI: ', REDIRECT_URI);

	const spotifyApi = new SpotifyWebApi({
		redirectUri: REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			console.log('Successfully logged in!');
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in
			});
		})
		.catch((err) => {
			// console.log('ERR: ', err);
			console.log('error_description: ', err.body.error_description);
			res.sendStatus(err.statusCode);
		});
});

app.post('/refresh', (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken
	});

	console.log('refreshToken', refreshToken);

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			// save the token so that it's used in future calls
			// spotifyApi.setAccessToken(data.body['access_token'])

			res.json({
				accessToken: data.body.access_token,
				expiresIn: data.body.expires_in
			});
		})
		.catch((err) => {
			// console.log('ERR: ', err);
			console.log('error_description: ', err.body.error_description);
			res.sendStatus(err.statusCode);
		});
});

app.listen(port);
