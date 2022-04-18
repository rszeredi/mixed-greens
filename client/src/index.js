import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { StateProvider } from './contexts/StateProvider';

import reducer, { initialState } from './contexts/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<StateProvider initialState={initialState} reducer={reducer}>
		<App />
	</StateProvider>
	// /* </React.StrictMode> */
);

// StrictMode renders components twice (on dev but not production)
// https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/61897567#61897567
