import React from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';

import Stat from '../Stat';
import StatAbbreviations from '../../constants/StatAbbreviations';

/**
 * The profile for a WoW character.
 *
 * @component
 */
function Profile({ name, realm }) {
	// TODO Move each query into it's own file
	const GET_CHARACTER_PROFILE = gql`
		query CharacterProfile($realm: String!, $name: String!) {
			characterProfile(realm: $realm, name: $name) {
				name
				level
				average_item_level
			}
		}
	`;

	const {
		loading: characterProfileLoading,
		error: characterProfileError,
		data: characterProfileData
	} = useQuery(GET_CHARACTER_PROFILE, {
		variables: { name, realm: realm.slug }
	});

	let level = '';
	let averageItemLevel = '';

	if (characterProfileData) {
		({
			level,
			average_item_level: averageItemLevel
		} = characterProfileData.characterProfile);
	}

	const GET_CHARACTER_MEDIA = gql`
		query CharacterMedia($realm: String!, $name: String!) {
			characterMedia(realm: $realm, name: $name) {
				assets {
					key
					value
				}
			}
		}
	`;

	const {
		loading: characterMediaLoading,
		error: characterMediaError,
		data: characterMediaData
	} = useQuery(GET_CHARACTER_MEDIA, {
		variables: { name, realm: realm.slug }
	});

	let avatarUrl = '';

	if (characterMediaData) {
		const { assets } = characterMediaData.characterMedia;
		const avatarAsset = assets.find(({ key }) => key === 'avatar');
		avatarUrl = avatarAsset.value;
	}

	const loading = characterProfileLoading || characterMediaLoading;
	const error = characterProfileError || characterMediaError;

	/**
	 * JSX
	 */

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className="flex items-center backdrop-blur-light p-4">
			<img src={avatarUrl} alt="" className="rounded-full" />
			<div className="ml-4">
				<h1 className="text-5xl text-white font-accent">{name}</h1>
				<Stat name={StatAbbreviations.CHAR_LEVEL} value={level} />
				<Stat
					name={StatAbbreviations.AVG_ITEM_LEVEL}
					value={averageItemLevel}
				/>
			</div>
		</div>
	);
}

Profile.propTypes = {
	name: PropTypes.string.isRequired,
	realm: PropTypes.object.isRequired
};

export default Profile;
