import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import AppReducer from './AppReducer';

const initialState = {
	user: JSON.parse(localStorage.getItem('wcv-user')) || null,
	gearSelected: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	function setUser(user) {
		dispatch({
			type: 'SET_USER',
			payload: user
		});
	}

	function unsetUser() {
		dispatch({
			type: 'UNSET_USER'
		});
	}

	function addGearSelected(slotName) {
		dispatch({
			type: 'ADD_GEAR_SELECTED',
			payload: slotName
		});
	}

	function removeGearSelected(slotName) {
		dispatch({
			type: 'REMOVE_GEAR_SELECTED',
			payload: slotName
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				setUser,
				unsetUser,
				user: state.user,
				addGearSelected,
				removeGearSelected,
				gearSelected: state.gearSelected
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

GlobalProvider.propTypes = {
	children: PropTypes.object.isRequired
};
