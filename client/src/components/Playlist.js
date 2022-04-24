import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';

import './Playlist.css';

function Playlist() {
	const [ { playlist, loadingPlaylist }, dispatch ] = useStateValue();

	const playTrack = (trackNumber) => {
		dispatch({ type: 'SET_PLAYING_TRACK_NUMBER', trackNumber: trackNumber });
	};
	const tracks = () =>
		playlist.map((track) => <Track {...track} key={track.id} playTrack={playTrack} />);

	const playlistRef = useRef(null);
	useEffect(
		() => {
			playlistRef.current.scrollTop = 0;
		},
		[ playlist ]
	);

	return (
		<div
			className={`Playlist my-5 align-items-center ${loadingPlaylist &&
				'MixedGreensApp-hide'}`}
			ref={playlistRef}
		>
			{playlist.length > 0 && (
				// <table className="Playlist-table table table-striped">
				<table className="Playlist-table table">
					<thead>
						<tr>
							<th scope="col" />
							<th scope="col">Title</th>
							<th scope="col">Album</th>
							<th scope="col">
								<i className="fa-solid fa-clock" />
							</th>
						</tr>
					</thead>
					<tbody>{tracks()}</tbody>
				</table>
			)}
		</div>
	);
}

function convertMillisecondsToTime(durationMs) {
	const durationMinsDouble = durationMs / 1000 / 60;
	const minutes = Math.floor(durationMinsDouble);
	const seconds = String(Math.round((durationMinsDouble - minutes) * 60)).padStart(2, '0');
	return `${minutes}:${seconds}`;
}

function Track({ trackName, artists, imageUrl, duration_ms, trackNumber, playTrack, album }) {
	const handleClick = () => {
		playTrack(trackNumber);
	};
	return (
		<tr onClick={handleClick}>
			<td>
				<img src={imageUrl} />
			</td>
			<td>
				<div>{trackName}</div>
				<div className="Playlist-artist">{artists.join(' & ')}</div>
			</td>
			<td>{album}</td>
			<td>{convertMillisecondsToTime(duration_ms)}</td>
		</tr>
	);
}

export default Playlist;
