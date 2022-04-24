import React, { useState, useEffect, useRef } from 'react';
import { Container, Form } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';
import { parseArtistsFromSearch, filterGenres, parseTracksFromSearch } from '../util/spotifyUtils';

import './SearchBar.css';

let searchTimeout;

function SearchBar() {
	const [ { spotify, seeds, showSearchDropDown }, dispatch ] = useStateValue();
	const [ search, setSearch ] = useState(''); // todo: should these be moved to state provider?
	const [ searchResultsArtists, setSearchResultsArtists ] = useState([]);
	const [ searchResultsGenres, setSearchResultsGenres ] = useState([]);
	const [ searchResultsTracks, setSearchResultsTracks ] = useState([]);
	const [ searchResultsCombined, setSearchResultsCombined ] = useState([]);

	// create a ref to the dropdown so that we can reset the scroll on a new search
	const dropdownRef = useRef(null);

	useEffect(
		() => {
			clearTimeout(searchTimeout);
			if (!search.length) {
				setSearchResultsCombined([]);
				dispatch({ type: 'HIDE_SEARCH_DROPDOWN' });
				return;
			}

			searchTimeout = setTimeout(() => {
				console.log(`searching: ${search}`);

				// search artists
				spotify
					.searchArtists(search)
					.then((res) => {
						const _searchResultsArtists = parseArtistsFromSearch(res);
						setSearchResultsArtists(_searchResultsArtists);
					})
					.catch((err) => console.error(err));

				// search and filter genres
				spotify
					.getAvailableGenreSeeds()
					.then((res) => {
						const filteredGenres = filterGenres(res, search);
						setSearchResultsGenres(filteredGenres);
					})
					.catch((err) => console.error(err));

				// search tracks
				spotify
					.searchTracks(search)
					.then((res) => {
						const _searchResultsTracks = parseTracksFromSearch(res);
						setSearchResultsTracks(_searchResultsTracks);
					})
					.catch((err) => console.log(err));
			}, 500);
		},
		[ search ]
	);

	useEffect(
		() => {
			// combine search results
			const maxSearchResults = Math.max(
				searchResultsGenres.length,
				searchResultsArtists.length,
				searchResultsTracks.length
			);
			let _searchResultsCombined = [];
			for (let i = 0; i < maxSearchResults; i++) {
				if (searchResultsGenres[i]) _searchResultsCombined.push(searchResultsGenres[i]);
				if (searchResultsArtists[i]) _searchResultsCombined.push(searchResultsArtists[i]);
				if (searchResultsTracks[i]) _searchResultsCombined.push(searchResultsTracks[i]);
			}
			setSearchResultsCombined(_searchResultsCombined);
			if (_searchResultsCombined.length) dispatch({ type: 'SHOW_SEARCH_DROPDOWN' });
			console.log('_searchResultsCombined', _searchResultsCombined);
		},
		[ searchResultsArtists, searchResultsGenres, searchResultsTracks ]
	);

	const handleChange = (e) => {
		setSearch(e.target.value);
		dropdownRef.current.scrollTop = 0; // reset to top
	};

	const handleSearchBarClick = (e) => {
		// prevent the dropdown results if the search bar itself is clicked
		e.stopPropagation();
	};

	const handleSelect = (artist) => {
		dispatch({ type: 'ADD_TO_SEEDS', newSeed: artist });
		console.log('seeds', seeds);
		setSearchResultsCombined([]);
		setSearch([]);
	};

	const dropdownItems = searchResultsCombined.map((item) => (
		// <a href="#" className="dropdown-item pb-3">
		// 	{artist.name}
		// </a>
		<SearchResult
			name={item.name}
			artist={item.type === 'track' ? item.artist : null}
			imageUrl={item.imageUrl}
			key={item.id}
			id={item.id}
			type={item.type}
			handleSelect={handleSelect}
		/>
	));

	return (
		<Container className="SearchBar d-flex flex-column p-0">
			<div className={`dropdown ${showSearchDropDown ? 'is-active' : ''}`}>
				<Form.Control
					type="search"
					className="SearchBar-search-bar"
					placeholder="Search for a song, artist, or genre..."
					value={search}
					onChange={handleChange}
					onClick={handleSearchBarClick}
				/>
				<div
					ref={dropdownRef}
					className="SearchBar-dropdown-menu dropdown-menu p-0"
					role="menu"
				>
					<div className="dropdown-content">{dropdownItems}</div>
				</div>
			</div>
		</Container>
	);
}

function SearchResult({ name, artist, imageUrl, id, handleSelect, type }) {
	const handleClick = () => {
		handleSelect({ id, name, imageUrl, type });
	};

	return (
		<div
			className="SearchBar-dropdown-item dropdown-item d-flex align-items-center"
			onClick={handleClick}
		>
			{imageUrl ? (
				<img src={imageUrl} alt="Seed Image" />
			) : (
				<div className="SearchBar-genre-icon">
					<i className="fa-solid fa-music" />
				</div>
			)}
			<div className={`m-3 ${type === 'genre' ? 'SearchBar-dropdown-genre' : ''}`}>
				<div>{name}</div>
				{artist !== null && <div className="text-muted">{artist}</div>}
			</div>
		</div>
	);
}

export default SearchBar;
