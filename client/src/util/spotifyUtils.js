function getSmallestImage(images) {
	return images.reduce((smallest, image) => {
		if (image.height < smallest.height) return image;
		else return smallest;
	}, images[0]);
}

export function parseTracksFromSearch(res) {
	return res.body.tracks.items.map((track) => {
		const smallestAlbumImage = getSmallestImage(track.album.images);

		return {
			artist: track.artists[0].name,
			name: track.name,
			uri: track.uri,
			imageUrl: smallestAlbumImage.url,
			id: track.id,
			type: 'track'
		};
	});
}

export function parseArtistsFromSearch(res) {
	return res.body.artists.items.map((artist) => {
		const smallestArtistImage = getSmallestImage(artist.images);

		return {
			name: artist.name,
			id: artist.id,
			uri: artist.uri,
			imageUrl: smallestArtistImage ? smallestArtistImage.url : null,
			type: 'artist'

			// imageUrl: smallestArtistImage?.url
		};
	});
}

export function filterGenres(res, search) {
	return res.body.genres.filter((i) => i.toLowerCase().includes(search)).map((genre) => ({
		name: genre.replace('-', ' '),
		id: genre,
		uri: null,
		imageUrl: null,
		type: 'genre'
	}));
}

export function parseRecommendations(recommendations) {
	return recommendations.tracks.map((track) => {
		const albumImage = getSmallestImage(track.album.images);
		return {
			artists: track.artists.map((a) => a.name),
			trackName: track.name,
			id: track.id,
			uri: track.uri,
			duration_ms: track.duration_ms,
			imageUrl: albumImage.url
		};
	});
}
