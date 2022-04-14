export const initialState = {
	user: null,
	// TODO: remove after debugging!
	token:
		'BQDNOoeGLZkuF9pXzY6jzJxC5Zr5C9sCIsYmU61sd4JYojmyEGnKZ-9uJj2de7Xl3xmJIPR4gUW22tIc3bDn5Vu60wNM3ToWIROZa-ORE2zjimKdBbaqiyJUDHz32lhbPEDW-scG5Znquv_xgIm16sNoD9JLnbaOchZRzyR5eWuQzftWk1NtDuSazDBc35AKO_JYoCnITExOLCAElloOJw',
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
