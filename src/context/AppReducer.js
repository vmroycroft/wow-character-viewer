// eslint-disable-next-line import/no-extraneous-dependencies
import pull from 'lodash/pull';

export default (state, action) => {
	switch (action.type) {
		case 'SET_USER': {
			const user = action.payload;
			localStorage.setItem('wcv-user', JSON.stringify(user));

			return {
				...state,
				user
			};
		}

		case 'UNSET_USER': {
			localStorage.clear();

			return {
				...state,
				user: null
			};
		}

		case 'ADD_GEAR_SELECTED': {
			const slotName = action.payload;
			const { gearSelected } = state;

			if (!gearSelected.includes(slotName)) {
				return {
					...state,
					gearSelected: [...gearSelected, slotName]
				};
			}

			return state;
		}

		case 'REMOVE_GEAR_SELECTED': {
			const slotName = action.payload;
			const { gearSelected } = state;

			return {
				...state,
				gearSelected: pull(gearSelected, slotName)
			};
		}

		default:
			return state;
	}
};
