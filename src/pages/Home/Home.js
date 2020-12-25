import React from 'react';
import { gql, useQuery } from '@apollo/client';

import Nav from '../../components/Nav';
import CharacterList from '../../components/CharacterList';

import styles from './Home.module.css';

function Home() {
	const GET_ACCOUNT_PROFILE = gql`
		query AccountProfile(
			$region: String!
			$namespace: String!
			$locale: String!
		) {
			accountProfile(region: $region, namespace: $namespace, locale: $locale) {
				battletag
				wow_accounts {
					characters {
						name
						realm {
							slug
						}
					}
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(GET_ACCOUNT_PROFILE, {
		variables: { region: 'us', namespace: 'profile-us', locale: 'en_US' }
	});

	let battletag = '';
	let wowAccounts = [];

	if (data) {
		({ battletag, wow_accounts: wowAccounts } = data.accountProfile);
	}

	/**
	 * JSX
	 */

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div className={`h-screen overflow-auto ${styles.background}`}>
			<div className="container mx-auto">
				<Nav battletag={battletag} />
				<CharacterList characters={wowAccounts[0].characters} />
			</div>
		</div>
	);
}

export default Home;

// import React, { useContext } from 'react';

// import { GlobalContext } from '../../context/GlobalState';

// // import styles from './Home.module.css';

// function Home() {
// 	const { user, unsetUser } = useContext(GlobalContext);

// 	const logout = () => {
// 		unsetUser();
// 	};

// 	return <div className="">Home</div>;
// }

// export default Home;
