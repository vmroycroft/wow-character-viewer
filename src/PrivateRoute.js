import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { GlobalContext } from './context/GlobalState';

function PrivateRoute({ component: Component, ...rest }) {
	const { user } = useContext(GlobalContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { referer: props.location } }}
					/>
				)
			}
		/>
	);
}

PrivateRoute.defaultProps = {
	location: ''
};

PrivateRoute.propTypes = {
	component: PropTypes.element.isRequired,
	location: PropTypes.string
};

export default PrivateRoute;
