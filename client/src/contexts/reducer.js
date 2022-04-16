export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	token: null,
	// token:
	// 	'BQA2fwzreI1Fn08iEGomWxlz0i8LkwIKiVlhcJsjcK9BQvC4fHK49Wur8jBdO10EfYnsSwTIzgrrSXET56Oy5H7cMhPpv4LCewrPDW-e9USjWMIQe9ufUzxw1V7olcSldTXt-_M45vR5l9SsslyBYI_tgu33AHXSQqMHiGdBF9G2H6KDuZUv0QSQyclWJBNrSAqPvg',
	seeds: [],
	playlist: [],
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
				seeds: [ ...state.seeds, action.newSeed ]
			};

		case 'CLEAR_SEEDS':
			return {
				...state,
				seeds: []
			};

		case 'DELETE_SEED':
			let newSeeds = [ ...state.seeds ].filter((i) => i.id != action.idToRemove); // do we actually need to create a copy?

			return {
				...state,
				seeds: newSeeds
			};
		case 'SET_PLAYLIST':
			return {
				...state,
				playlist: action.playlist
			};
		default:
			return state;
	}
};

export default reducer;
