import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';

import { GlobalContext } from '../../context/GlobalState';
import EquipmentSlots from '../../constants/EquipmentSlots';
import EquippedItem from '../EquippedItem';

import GET_CHARACTER_EQUIPMENT from '../../graphql/queries/GetCharacterEquipment';

import styles from './Gear.module.css';

/**
 * The gear for a WoW character.
 *
 * @component
 */
function Gear({ name, realm }) {
	/**
	 * State/Context
	 */

	const { addGearSelected, removeGearSelected, gearSelected } = useContext(
		GlobalContext
	);

	/**
	 * GraphQL
	 */

	const { loading, error, data } = useQuery(GET_CHARACTER_EQUIPMENT, {
		variables: { name, realm: realm.slug }
	});

	/**
	 * Main Logic
	 */

	// Components/elements representing each equipped item
	let equippedItemsJsx = [];

	// If the GraphQL query has finished and returned data
	if (data) {
		equippedItemsJsx = createEquipmentSlots(data.characterEquipment);
	}

	/**
	 * Functions
	 */

	/**
	 *
	 * @param {*} character
	 * @param {*} slotName
	 */
	function createEmptySlot(character, slotName) {
		return (
			<div
				key={`${character.id}-${slotName}-none`}
				className="border-b border-black border-opacity-25 text-purple-300 py-2"
			>
				Not equipped
			</div>
		);
	}

	/**
	 * Creates an equipped item for each of the pre-defined equipment slots.
	 */
	function createEquipmentSlots(characterEquipment) {
		const { character, equipped_items: equippedItems } = characterEquipment;
		const equipmentSlots = [];

		EquipmentSlots.forEach((equipmentSlot) => {
			// The grid displays two items per row, so add the equipment slot here,
			// then add the item next. Repeat for each slot.
			equipmentSlots.push(createSlotName(character, equipmentSlot));

			// Look for the specified slot in the array of equipped items
			const foundItem = equippedItems.find(
				({ slot }) => slot.type === equipmentSlot
			);

			// If the equipped items include the slot
			if (foundItem) {
				// Add it
				equipmentSlots.push(createEquippedItem(character, foundItem));
			}
			// Otherwise, the character does not have an item in this slot
			else {
				// Create an empty slot
				equipmentSlots.push(createEmptySlot(character, equipmentSlot));
			}
		});

		return equipmentSlots;
	}

	/**
	 *
	 * @param {*} character
	 * @param {*} item
	 */
	function createEquippedItem(character, item) {
		return (
			<EquippedItem
				key={`${character.id}-${item.item.id}`}
				slot={item.slot}
				name={item.name}
				level={item.level}
				item={item.item}
				azeriteDetails={item.azerite_details}
				armor={item.armor}
			/>
		);
	}

	/**
	 *
	 * @param {*} character
	 * @param {*} slotName
	 */
	function createSlotName(character, slotName) {
		const conditionalClasses = classNames({
			[styles.selected]: gearSelected.includes(slotName)
		});

		return (
			<div
				key={`${character.id}-${slotName}`}
				className="border-b border-black border-opacity-25 pr-4 py-2"
			>
				<span
					className={`text-xs rounded-md py-1 px-2 cursor-pointer ${styles.slotName} ${conditionalClasses}`}
					onClick={() => toggleSlot(slotName)}
				>
					{slotName}
				</span>
			</div>
		);
	}

	/**
	 *
	 * @param {*} slotName
	 */
	function toggleSlot(slotName) {
		gearSelected.includes(slotName)
			? removeGearSelected(slotName)
			: addGearSelected(slotName);
	}

	/**
	 * JSX
	 */

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			<h2 className="text-3xl font-accent text-white p-4">Gear</h2>
			<div className={`grid px-8 ${styles.gridCols}`}>{equippedItemsJsx}</div>
		</div>
	);
}

Gear.propTypes = {
	name: PropTypes.string.isRequired,
	realm: PropTypes.object.isRequired
};

export default Gear;
