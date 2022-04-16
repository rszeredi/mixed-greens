export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	// token: null,
	token:
		'BQD56-QiVE6c4ifoERJhEPIjbEksAHkHR06DlNfXZbO4GOBYK0a7eeGHtsaOkEMTihkNRqp1bjKbe3_Y-Ht_pHTGlHJkHPbtE7LN3mKNYwXd75QOZ7mFSHgEBiQRRY2wBcCrePwXE-D0JVCxFZjoFyLnE0u1Njw1DTHVCnQYZMpMdcgGV1ynC6blmajQ2tVHiHKJLIGPPBx2j5a9Srwbjg',
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
