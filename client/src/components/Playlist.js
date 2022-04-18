import React from 'react';
import { Container } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';

import './Playlist.css';

function Playlist() {
	const [ { playlist }, dispatch ] = useStateValue();
	console.log('playlist', playlist);
	const tracks = () => playlist.map((track) => <Track {...track} key={track.id} />);

	// flex-grow-1
	return (
		<div className="Playlist my-5 align-items-center">
			{playlist.length > 0 && (
				// <table className="Playlist-table table table-striped">
				<table className="Playlist-table table">
					<thead>
						<tr>
							<th scope="col" />
							<th scope="col">Title</th>
							<th scope="col">Artist</th>
							<th scope="col">
								<i class="fa-solid fa-clock" />
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
	const seconds = String(Math.round((durationMinsDouble - minutes) * 60)).padEnd(2, '0');
	return `${minutes}:${seconds}`;
}

function Track({ trackName, artists, imageUrl, duration_ms }) {
	return (
		<tr>
			<td>
				<img src={imageUrl} />
			</td>
			<td>{trackName}</td>
			<td>{artists.join(' & ')}</td>
			<td>{convertMillisecondsToTime(duration_ms)}</td>
		</tr>
	);
}

export default Playlist;
