export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	token: null,
	token:
		'BQBKqW8t5U0--GWdNUmQRDvPmcmbKEMeyLkPGn2jgD0HoG5DZrwlTYec5bmMMzgpsfcrQuwXIWIgDQhTD7wnP8V3cLrmFTpsIL2qGcz8tN_yWyS7rEPP062JFlFg-EmW73UPL9ZNtPLGXRbucKgiWYKFooNvcr5H0ZyX4noyg2PDPiTqxL5_oR9p2ryRK86rKex85w',
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
			let newSeeds = [ ...state.seeds ].filter((i) => i.id !== action.idToRemove); // do we actually need to create a copy?

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
