export const initialState = {
	spotify: null,
	user: null,
	// TODO: remove after debugging!
	token: null,
	// token:
	// 'BQAVmMsAUkyGjcR6xmv3R1RaTn79rIhf9A4LCwWwaxixCO10JXgVOsLHjlbeg44N-xN8eURxm6yNUbSa5I6ZlEmkf86TVX1h3e7fTzd6QFDR_4veSAiKpYEv8hQjiLoBzZARXYl8btzMKMACaiYJVc9AaSPhQwEDqj4sjHgWGPNsPr0CzBEg0K8lSm9CIQuCxGZFJQ',
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
