function parseTracksFromSearch(res) {
	return res.body.tracks.items.map((track) => {
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
}

export function parseArtistsFromSearch(res) {
	return res.body.artists.items.map((artist) => {
		const smallestArtistImage = artist.images.reduce((smallest, image) => {
			if (image.height < smallest.height) return image;
			else return smallest;
		}, artist.images[0]);

		return {
			name: artist.name,
			id: artist.id,
			uri: artist.uri,
			imageUrl: smallestArtistImage ? smallestArtistImage.url : null
			// imageUrl: smallestArtistImage?.url
		};
	});
}
