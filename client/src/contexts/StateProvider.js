import { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

// children is automatically passed in
export const StateProvider = ({ initialState, reducer, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
