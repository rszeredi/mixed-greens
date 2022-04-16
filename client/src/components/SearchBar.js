import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';
import { parseArtistsFromSearch } from '../util/spotifySearchUtils';

import './SearchBar.css';

let searchTimeout;

function SearchBar() {
	const [ { spotify }, reducer ] = useStateValue();
	const [ search, setSearch ] = useState(''); // todo: should these be moved to state provider?
	const [ searchResults, setSearchResults ] = useState([]);

	useEffect(
		() => {
			clearTimeout(searchTimeout);
			if (!search) return setSearchResults([]);

			searchTimeout = setTimeout(() => {
				console.log('searching: ', search);
				spotify.searchArtists(search).then((res) => {
					console.log(res);

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

	const dropdownItems = searchResults.map((artist) => (
		// <a href="#" className="dropdown-item pb-3">
		// 	{artist.name}
		// </a>
		<div className="SearchBar-dropdown-item dropdown-item py-2 d-flex align-items-center">
			<img src={artist.imageUrl} />
			<div className="m-3">{artist.name}</div>
		</div>
	));

	console.log('searchResults', searchResults);
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

export default SearchBar;
