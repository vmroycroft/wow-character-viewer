import { gql } from '@apollo/client';

const GET_CHARACTER_EQUIPMENT = gql`
	query CharacterEquipment($realm: String!, $name: String!) {
		characterEquipment(realm: $realm, name: $name) {
			character {
				id
				name
			}
			equipped_items {
				item {
					id
				}
				slot {
					type
					name
				}
				name
				azerite_details {
					percentage_to_next_level
					level {
						value
					}
				}
				level {
					value
				}
				armor {
					value
				}
				stats {
					type {
						type
						name
					}
					value
					is_negated
				}
			}
		}
	}
`;

export default GET_CHARACTER_EQUIPMENT;
