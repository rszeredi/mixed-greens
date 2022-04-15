export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	// token: null,
	token:
		'BQDSCHPH4sfoklxiTIbuK3mylZDF4m0rDAO-5SIi1xK5GOHh91eMvIML-rUjFG49rr3AK-3xHZSx7wQGv60GxlMZTYLcccDFXmYrcWDKWDc9Coq2P3SnL8171bGpu14pLRm2dHSHwpjYuY7lYETy3bA_NImZyU92LXZ_S5bQ-kZR20BqI0wDD4bx8mijOXM_qOOCcZ0SGpEgwTsPagOYEQ',
	seeds: [],
	playlist: null,
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
		default:
			return state;
	}
};

export default reducer;
