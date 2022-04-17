import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useStateValue } from '../contexts/StateProvider';
import './Controls.css';

function Controls() {
	const [ { token, playlist }, dispatch ] = useStateValue();
	const [ isPlaying, setIsPlaying ] = useState(false);

	useEffect(
		() => {
			if (playlist.length) {
				setIsPlaying(true);
				console.log('setIsPlaying(true)', isPlaying);
			}
		},
		[ playlist ]
	);
	// console.log('>>>USER: ', spotify.getMe());
	// if (!playlist.length) return;

	// console.log('uri', playlist[0].uri);
	return (
		<div className="Controls-player">
			<SpotifyPlayer
				token={token}
				uris={!playlist.length ? [] : playlist.map((i) => i.uri)}
				callback={(state) => {
					if (!state.isPlaying) setIsPlaying(false);
				}}
				play={isPlaying}
			/>
		</div>
	);
}

export default Controls;
