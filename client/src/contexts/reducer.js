export const initialState = {
	user: null,
	token: null,
	seeds: [],
	playlist: null,
	playing: false,
	item: null
};

const reducer = (state, action) => {
	console.log(action); // very useful for debugging!

	switch (action.type) {
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
		default:
			return state;
	}
};

export default reducer;
