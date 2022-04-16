import React from 'react';
import { Container } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';

import './Playlist.css';

function Playlist() {
	const [ { playlist }, dispatch ] = useStateValue();
	const tracks = () => playlist.map((track) => <Track {...track} key={track.id} />);

	return (
		<div className="Playlist flex-grow-1 my-2">
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Title</th>
						<th scope="col">Artist</th>
					</tr>
				</thead>
				<tbody>{playlist.length > 0 && tracks()}</tbody>
			</table>
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
