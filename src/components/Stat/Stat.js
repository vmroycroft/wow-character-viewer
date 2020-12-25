import React from 'react';
import PropTypes from 'prop-types';

/**
 * A stat.
 *
 * @component
 */
function Stat({ name, value }) {
	/**
	 * JSX
	 */

	return (
		<div className="inline-block mr-4 text-sm uppercase">
			<span className="text-yellow-500 mr-1">{name}</span>
			<span className="text-white">{value}</span>
		</div>
	);
}

Stat.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired
};

export default Stat;
