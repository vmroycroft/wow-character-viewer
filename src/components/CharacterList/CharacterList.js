import React from 'react';
import PropTypes from 'prop-types';

import Character from '../Character';

/**
 * The list of characters for the logged in player.
 *
 * @component
 */
function CharacterList({ characters }) {
	const charactersJsx = characters.map(({ name, realm }) => (
		<Character key={name} name={name} realm={realm} />
	));

	/**
	 * JSX
	 */

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">{charactersJsx}</div>
	);
}

CharacterList.propTypes = {
	characters: PropTypes.array.isRequired
};

export default CharacterList;
