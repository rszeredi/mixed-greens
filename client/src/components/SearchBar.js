import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';
import { parseArtistsFromSearch, filterGenres, parseTracksFromSearch } from '../util/spotifyUtils';

import './SearchBar.css';

let searchTimeout;

function SearchBar() {
	const [ { spotify, seeds }, dispatch ] = useStateValue();
	const [ search, setSearch ] = useState(''); // todo: should these be moved to state provider?
	const [ searchResultsArtists, setSearchResultsArtists ] = useState([]);
	const [ searchResultsGenres, setSearchResultsGenres ] = useState([]);
	const [ searchResultsTracks, setSearchResultsTracks ] = useState([]);
	const [ searchResultsCombined, setSearchResultsCombined ] = useState([]);

	useEffect(
		() => {
			clearTimeout(searchTimeout);
			if (!search.length) return setSearchResultsCombined([]);

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
			console.log('_searchResultsCombined', _searchResultsCombined);
		},
		[ searchResultsArtists, searchResultsGenres, searchResultsTracks ]
	);

	const handleChange = (e) => {
		setSearch(e.target.value);
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

	console.log('>>>>SEEDS: ', seeds);
	return (
		<Container className="d-flex flex-column">
			<div className={`dropdown ${searchResultsCombined.length ? 'is-active' : ''}`}>
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
					<i className="fa fa-solid fa-music" />
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
