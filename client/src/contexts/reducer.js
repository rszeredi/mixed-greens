export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	token: null,
	token:
		'BQA9WcryyCsEmKPmjuHSBho-jbY5MY6mxx4VtL0tQsA0kBPmXm50tL4pRjuwghBryWsi_GEO7X1mgYJbXNX48mPeQQqE1nxcfUdyd32oEYM3gSlQHztN7_UIEGyI68euV1DCa3-aG3lnFI4g8NydgW2IrLvwVMwfs1oigEfdaitLwTu1QXzclVfKNTFpbl_FB0F1VDIIqp5GvuGRJ_d8ew',
	seeds: new Set(),
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
				seeds: new Set([ ...Array.from(state.seeds), action.newSeed ])
			};

		case 'CLEAR_SEEDS':
			return {
				...state,
				seeds: new Set()
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
