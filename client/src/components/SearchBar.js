import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

import './SearchBar.css';

function SearchBar() {
	const [ search, setSearch ] = useState('');

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<Container className="d-flex flex-column py-2">
			<Form.Control
				type="search"
				placeholder="Search for a song, artist, or genre..."
				value={search}
				onChange={handleChange}
			/>
		</Container>
	);
}

export default SearchBar;
