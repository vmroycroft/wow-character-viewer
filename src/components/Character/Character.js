import React from 'react';
import PropTypes from 'prop-types';

import Profile from '../Profile';
import Gear from '../Gear';

/**
 * A WoW character.
 *
 * @component
 */
function Character({ name, realm }) {
	/**
	 * JSX
	 */

	return (
		<div>
			<Profile name={name} realm={realm} />
			<div className="backdrop-blur-dark">
				<Gear name={name} realm={realm} />
			</div>
		</div>
	);
}

Character.propTypes = {
	name: PropTypes.string.isRequired,
	realm: PropTypes.object.isRequired
};

export default Character;
