export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	// token: null,
	token:
		'BQCZszHNZA957P796R2XtbfubPJPELqxmgwk5K4YBf6GtG2N8ulEIE8iAwPeceBaXLSBwCVRWJ5P9ufkpHMsNkVQXnq4cPxpcmKP0_Rbm-M8L8TYooU5mVOgTY8xOf3VOAHMlN6-fO97oUEH-MXeS9tB1e9GxX2eHS-qu0Zf6lAn7Z9jSc-xnTS71f0LnwcP4X75vYBjC1Vud4R_NTlxWw',
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
		default:
			return state;
	}
};

export default reducer;
