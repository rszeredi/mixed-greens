export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	token: null,
	token:
		'BQBL1SC4SwzKewSX2pPr_s_1kSEAKujSFXTqB0TUhR3J1HVf2RRlR9AmgRzu4hj5mrCH_HUas0GdzdiB_YF0L7l5yk6VKYhWNOt_aGu2gjbBVtp9T9DRtkGaj8yPcC9S1Pwtt5RKpqV8PLBoWJBxnMEmyuABbTyMiEaqtAgqtKS_JkAwEErS1nqRhXmbW532c8-kUw',
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
		case 'DELETE_TOKEN':
			return {
				...state,
				token: null
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
