import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useStateValue } from '../contexts/StateProvider';
import './Controls.css';

function Controls() {
	const [ { token, spotify }, dispatch ] = useStateValue();
	// console.log('>>>USER: ', spotify.getMe());
	return (
		<div>
			<SpotifyPlayer token={token} uris={[]} />
		</div>
	);
}

export default Controls;
