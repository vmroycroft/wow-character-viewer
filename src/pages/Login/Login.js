import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../components/Button';

import bliz from '../../assets/images/bliz.png';
import github from '../../assets/images/github.png';

import styles from './Login.module.css';

/**
 * @component
 * @category Pages
 */
function Login({ location }) {
	const [isLoggedIn] = useState(false);

	const referer = location.state?.referer || '/';

	/**
	 *
	 */
	const login = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	};

	/**
	 * Side Effects
	 */

	/**
	 * JSX
	 */
	if (isLoggedIn) {
		return <Redirect to={referer} />;
	}

	return (
		<>
			<iframe
				className={styles.background}
				title="background"
				src="https://www.youtube-nocookie.com/embed/OwmMI3TjXj0?controls=0&amp;autoplay=1&amp;mute=1&amp;start=60"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div className="h-screen flex flex-col items-center">
				<div className="flex-grow">
					<div className="flex flex-col justify-start items-center pt-24">
						<h1 className="text-11xl font-accent font-semibold text-black text-opacity-70">
							WoW
						</h1>
						<h1 className="text-7xl font-accent text-white text-shadow">
							Character Viewer
						</h1>
						<p className="text-lg font-light text-white text-shadow mt-24 mb-10">
							View stats for all of your characters in one place.
						</p>
						<Button onClick={() => login()}>
							<img src={bliz} alt="" className="inline-block -mt-1 mr-2" />
							Sign in with Blizzard
						</Button>
					</div>
				</div>
				<div className="pb-4">
					<a
						href="https://github.com/vmroycroft/wow-character-viewer"
						target="_blank"
						rel="noreferrer"
						title="View project on Github"
					>
						<img src={github} alt="" className="inline-block" />
					</a>
				</div>
			</div>
		</>
	);
}

Login.defaultProps = {
	location: null
};

Login.propTypes = {
	/**
	 * Used to check for a referrer so the user can be redirected back to that page after logging in.
	 */
	location: PropTypes.object
};

export default Login;

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import { GlobalContext } from '../../context/GlobalState';

// // import styles from './Login.module.scss';

// /**
//  * @component
//  * @category Pages
//  */
// function Login({ location }) {
// 	const { user, setUser } = useContext(GlobalContext);

// 	const [isLoggedIn, setIsLoggedIn] = useState(false);

// 	const referer = location.state?.referer || '/';

// 	const login = async (event) => {
// 		event.preventDefault();
// 	};

// 	/**
// 	 * Side Effects
// 	 */

// 	// Called after setting the user
// 	useEffect(() => {
// 		user && setIsLoggedIn(true);
// 	}, [user]);

// 	/**
// 	 * JSX
// 	 */
// 	if (isLoggedIn) {
// 		return <Redirect to={referer} />;
// 	}

// 	return <div className="">Login</div>;
// }

// Login.propTypes = {
// 	/**
// 	 * Used to check for a referrer so the user can be redirected back to that page after logging in.
// 	 */
// 	location: PropTypes.object
// };

// Login.defaultProps = {
// 	location: null
// };

// export default Login;
