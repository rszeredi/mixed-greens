import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useStateValue } from '../contexts/StateProvider';
import './Controls.css';

function Controls() {
	const [ { token, playlist, playingTrackNumber, loadingPlaylist }, dispatch ] = useStateValue();
	const [ isPlaying, setIsPlaying ] = useState(false);

	useEffect(
		() => {
			if (playlist.length && !loadingPlaylist) {
				setIsPlaying(true);
			}
		},
		[ playlist, loadingPlaylist ]
	);

	return (
		<div
			className={`Controls-player mt-3 ${playlist.length === 0 || loadingPlaylist
				? 'hide'
				: ''}`}
		>
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
