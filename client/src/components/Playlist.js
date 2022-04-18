import React from 'react';
import { Container } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';

import './Playlist.css';

function Playlist() {
	const [ { playlist }, dispatch ] = useStateValue();
	const tracks = () => playlist.map((track) => <Track {...track} key={track.id} />);

	// flex-grow-1
	return (
		<div className="Playlist my-1 align-items-center">
			{playlist.length > 0 && (
				// <table className="Playlist-table table table-striped">
				<table className="Playlist-table table">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Artist</th>
						</tr>
					</thead>
					<tbody>{tracks()}</tbody>
				</table>
			)}
		</div>
	);
}

function Track({ trackName, artist }) {
	return (
		<tr>
			<td>{trackName}</td>
			<td>{artist}</td>
		</tr>
	);
}

export default Playlist;
