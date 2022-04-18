const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: 'http://localhost:3000',
		clientId: 'ce3a4e00e98a45ec8027b9b925817651',
		clientSecret: '7016fae8d2724455a0b4b14f032c4d28'
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in
			});
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});

app.listen(3001);
