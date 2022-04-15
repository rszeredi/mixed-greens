import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';

import { useStateValue } from '../contexts/StateProvider';

import './SearchBar.css';

function SearchBar() {
	const [ { spotify }, reducer ] = useStateValue();
	const [ search, setSearch ] = useState(''); // todo: should these be moved to state provider?
	const [ searchResults, setSearchResults ] = useState([]);

	useEffect(
		() => {
			if (!search) return setSearchResults([]);

			spotify.searchTracks(search).then((res) => {
				const _searchResults = res.body.tracks.items.map((track) => {
					const smallesAlbumImage = track.album.images.reduce((smallest, image) => {
						if (image.height < smallest.height) return image;
						else return smallest;
					}, track.album.images[0]);

					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: smallesAlbumImage.url
					};
				});
				setSearchResults(_searchResults);
			});

			return () => {
				'';
			};
		},
		[ search ]
	);

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
