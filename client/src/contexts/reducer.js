export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	token: null,
	token:
		'BQDw0679wn1nSMRXF9_b8N7VQoFs09plbcT7_gR6Nm-sZbVdostwfilyBRrIcQrj5wiCCXVq7bHfeMjGCe5IBMhl2gxPM9-wVBDdbeJVxBF1_jKabipB684TyBGl5yHdnzltP86DSBUOTgTwMuVzrOOv8K4DhkoRcZQ7MhCbpu3AShM_iDnb5zzYFuZiGKCHWtmVCA',
	seeds: [],
	playlist: [],
	playing: false,
	item: null,
	isFirstUse: true
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
		case 'DELETE_TOKEN':
			return {
				...state,
				token: null
			};
		case 'SET_NOT_FIRST_USE':
			return {
				...state,
				isFirstUse: false
			};

		case 'SET_IS_FIRST_USE':
			return {
				...state,
				isFirstUse: true
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
