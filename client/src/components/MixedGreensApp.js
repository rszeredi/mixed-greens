import React from 'react';
import { Container } from 'react-bootstrap';
import Controls from './Controls';

import './MixedGreensApp.css';
import Playlist from './Playlist';
import SeedCollector from './SeedCollector';

function MixedGreensApp() {
	return (
		<Container
			className="d-flex flex-column align-items-center py-5"
			style={{ height: '100vh' }}
		>
			<h1 className="text-center mt-5">Mixed Greens</h1>
			<SeedCollector />
			<Playlist />
			<Controls />
		</Container>
	);
}

export default MixedGreensApp;
