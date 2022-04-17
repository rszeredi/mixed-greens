export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	token: null,
	token:
		'BQDymO0wUdAEytlUSc3j4o06WwEzYdGKK-CHrczhuJg2u1Z2hy4IUK6sWlf-E9eSFoeefZJI2L8zBZESQ_goLn4ssIVUA0Povl8zkVYoteVXndazL0mA80Mn-MgjfR0jvKhYD9_6cv6OSLl3DJ21ZjaPuYeoExzWdsx0qx-eR5U-fluntSdFjcyaHFnriZQ505QJoQ',
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
