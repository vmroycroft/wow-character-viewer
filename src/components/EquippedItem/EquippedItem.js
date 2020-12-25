import React from 'react';
import PropTypes from 'prop-types';

import StatAbbreviations from '../../constants/StatAbbreviations';
import Stat from '../Stat';

/**
 * An item that the character has equipped.
 *
 * @component
 */
function EquippedItem({ name, level, azeriteDetails, armor }) {
	/**
	 *
	 * @param {string} statName
	 * @param {*} value
	 */
	const createStat = (statName, value) => (
		<Stat key={`${statName}-${value}`} name={statName} value={value} />
	);

	const stats = [];
	const { LEVEL, ARMOR, AZERITE } = StatAbbreviations;

	stats.push(createStat(LEVEL, level.value));

	if (azeriteDetails?.level?.value)
		stats.push(createStat(AZERITE, azeriteDetails.level.value));

	if (armor?.value) stats.push(createStat(ARMOR, armor.value));

	/**
	 * JSX
	 */

	return (
		<div className="border-b border-black border-opacity-25 py-2">
			<span className="text-white text-sm">{name}</span>
			<br />
			{stats}
		</div>
	);
}

EquippedItem.defaultProps = {
	name: '',
	azeriteDetails: null,
	armor: null
};

EquippedItem.propTypes = {
	name: PropTypes.string,
	level: PropTypes.object.isRequired,
	azeriteDetails: PropTypes.object,
	armor: PropTypes.object
};

export default EquippedItem;
