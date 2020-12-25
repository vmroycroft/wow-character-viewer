import React from 'react';
import PropTypes from 'prop-types';

/**
 * The top navigation bar.
 *
 * @component
 */
function Nav({ battletag }) {
	/**
	 * JSX
	 */

	return (
		<div className="flex justify-between text-white text-shadow py-8">
			<div>
				<span className="pr-8">Gear</span>
				<span>Reputation</span>
			</div>
			<div>{battletag}</div>
		</div>
	);
}

Nav.propTypes = {
	battletag: PropTypes.string.isRequired
};

export default Nav;
