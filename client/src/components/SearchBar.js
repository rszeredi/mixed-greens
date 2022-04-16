import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';
import { parseArtistsFromSearch } from '../util/spotifyUtils';

import './SearchBar.css';

let searchTimeout;

function SearchBar() {
	const [ { spotify, seeds }, dispatch ] = useStateValue();
	const [ search, setSearch ] = useState(''); // todo: should these be moved to state provider?
	const [ searchResults, setSearchResults ] = useState([]);

	useEffect(
		() => {
			clearTimeout(searchTimeout);
			if (!search.length) return setSearchResults([]);

			searchTimeout = setTimeout(() => {
				console.log(`searching: ${search}`);
				spotify.searchArtists(search).then((res) => {
					const _searchResults = parseArtistsFromSearch(res);
					setSearchResults(_searchResults);
				});
			}, 500);
		},
		[ search ]
	);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSelect = (artist) => {
		dispatch({ type: 'ADD_TO_SEEDS', newSeed: artist });
		console.log('seeds', seeds);
		setSearchResults([]);
		setSearch([]);
	};

	const dropdownItems = searchResults.map((artist) => (
		// <a href="#" className="dropdown-item pb-3">
		// 	{artist.name}
		// </a>
		<SearchResult
			name={artist.name}
			imageUrl={artist.imageUrl}
			key={artist.id}
			id={artist.id}
			handleSelect={handleSelect}
		/>
	));

	return (
		<Container className="d-flex flex-column py-2">
			<div className={`dropdown ${searchResults.length ? 'is-active' : ''}`}>
				<Form.Control
					type="search"
					placeholder="Search for a song, artist, or genre..."
					value={search}
					onChange={handleChange}
				/>
				<div className="SearchBar-dropdown-menu dropdown-menu p-0" role="menu">
					<div className="dropdown-content">{dropdownItems}</div>
				</div>
			</div>
		</Container>
	);
}

function SearchResult({ name, imageUrl, id, handleSelect }) {
	const handleClick = () => {
		handleSelect({ id, name, imageUrl });
	};

	return (
		<div
			className="SearchBar-dropdown-item dropdown-item py-2 d-flex align-items-center"
			onClick={handleClick}
		>
			<img src={imageUrl} />
			<div className="m-3">{name}</div>
		</div>
	);
}

export default SearchBar;
