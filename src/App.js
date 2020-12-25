import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink
} from '@apollo/client';

import { GlobalProvider } from './context/GlobalState';
// import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
	const link = createHttpLink({
		uri: process.env.REACT_APP_WOWQL_URL,
		credentials: 'include'
	});

	const client = new ApolloClient({
		link,
		cache: new InMemoryCache()
	});

	return (
		<GlobalProvider>
			<ApolloProvider client={client}>
				<Router>
					<Route path="/login" component={Login} />
					<Route exact path="/" component={Home} />
					{/* <PrivateRoute exact path="/" component={Home} /> */}
				</Router>
			</ApolloProvider>
		</GlobalProvider>
	);
}

export default App;
