export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	token: null,
	token:
		'BQCUUbxoDFnUvW8kdA8EzV6-KtQv1cWXvyJf9OeoCWRXt9h4CwS3qJ5nGlbyynTx0xSzPZU4iDe8t80AMnpAHvU-cJcWWhBA04jDwaZMTsUHnjXqBi_oRRVDloejstyJaqJ-m5soPu9m-JqwnkDREPv60VFBho7VELuh6J0qdeBK_VY8zd1-dYt4SdVQqVi6PQbS8TVGQDgHJpbOMgfhpA',
	seeds: new Set(),
	playlist: null,
	playing: false,
	item: null
};

const reducer = (state, action) => {
	console.log(action); // very useful for debugging!

	switch (action.type) {
		case 'SET_SPOTIFY':
			return {
				...state,
				spotify: action.spotify
			};
		case 'SET_USER':
			return {
				...state,
				user: action.user
			};
		case 'SET_TOKEN':
			return {
				...state,
				token: action.token
			};
		case 'ADD_TO_SEEDS':
			return {
				...state,
				seeds: new Set([ ...Array.from(state.seeds), action.newSeed ])
			};

		case 'CLEAR_SEEDS':
			return {
				...state,
				seeds: new Set()
			};
		default:
			return state;
	}
};

export default reducer;
