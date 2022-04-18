import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useStateValue } from '../contexts/StateProvider';
import './Controls.css';

function Controls() {
	const [ { token, playlist, playingTrackNumber }, dispatch ] = useStateValue();
	const [ isPlaying, setIsPlaying ] = useState(false);

	useEffect(
		() => {
			if (playlist.length) {
				setIsPlaying(true);
			}
		},
		[ playlist ]
	);
	console.log('playingTrackNumber: ', playingTrackNumber);
	// if (!playlist.length) return;

	// console.log('uri', playlist[0].uri);
	return (
		<div className={`Controls-player mt-3 ${playlist.length === 0 ? 'hide' : ''}`}>
			<SpotifyPlayer
				token={token}
				uris={!playlist.length ? [] : playlist.map((i) => i.uri)}
				offset={playingTrackNumber}
				callback={(state) => {
					if (!state.isPlaying) setIsPlaying(false);
				}}
				play={isPlaying}
				styles={{
					bgColor: '#191414 !important',
					color: 'white',
					trackNameColor: 'white',
					trackArtistColor: '#6c757d',
					sliderHandleColor: 'white'
				}}
			/>
		</div>
	);
}

export default Controls;
