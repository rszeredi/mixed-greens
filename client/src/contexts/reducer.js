export const initialState = {
	spotify: null,
	user: null,
	isValidUser: null,
	// TODO: remove after debugging!
	code: null,
	token: null,
	// token:
	// 	'BQBDD6x6dnHREd7uS9he4nyrguSm7SDtN29hKD8SSORObC10O2HuveZQc93MeJgIWLgcctSbWh9Cbb0KXnh28ukW8knCQqixYyC6O0m6Hr1hQVT3fg3jmETEh972wI9_iRuUFtjbUCWDMkgmtWKA6Af_iARYjS2Baie6N9U4v2yg-YXCSD26HA8q4yJG1SjYU1BLsw',
	seeds: [],
	playlist: [],
	playingTrackNumber: 0,
	playing: false,
	item: null,
	isFirstUse: true,
	loadingPlaylist: false,
	showSearchDropDown: false
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
				user: action.user,
				isValidUser: true
			};
		case 'UNSET_USER':
			return {
				...state,
				user: null,
				isValidUser: null
			};
		case 'SET_INVALID_USER':
			return {
				...state,
				isValidUser: false
			};
		case 'SET_CODE':
			return {
				...state,
				code: action.code
			};
		case 'SET_TOKEN':
			return {
				...state,
				token: action.token
			};
		case 'DELETE_TOKEN_AND_CODE':
			return {
				...state,
				token: null,
				code: null
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
			if (state.seeds.map((i) => i.id).includes(action.newSeed.id)) return state;
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
		case 'SET_LOADING':
			return {
				...state,
				loadingPlaylist: action.value
			};
		case 'SET_PLAYLIST':
			return {
				...state,
				playlist: action.playlist
			};

		case 'START_PLAYLIST_FROM_START':
			return {
				...state,
				playingTrackNumber: 0
			};

		case 'SET_PLAYING_TRACK_NUMBER':
			return {
				...state,
				playingTrackNumber: action.trackNumber
			};

		case 'HIDE_SEARCH_DROPDOWN':
			return {
				...state,
				showSearchDropDown: false
			};

		case 'SHOW_SEARCH_DROPDOWN':
			return {
				...state,
				showSearchDropDown: true
			};

		default:
			return state;
	}
};

export default reducer;
