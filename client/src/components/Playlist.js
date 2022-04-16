import React from 'react';
import { Container } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';

import './Playlist.css';

function Playlist() {
	const [ { playlist }, dispatch ] = useStateValue();
	const tracks = () => playlist.map((track) => <Track {...track} key={track.id} />);

	return <div className="Playlist flex-grow-1 my-2">{playlist.length > 0 && tracks()}</div>;
}

function Track({ trackName, artist }) {
	return (
		<Container className="d-flex">
			<div>{trackName}</div>
			<div>{artist}</div>
		</Container>
	);
}

export default Playlist;
