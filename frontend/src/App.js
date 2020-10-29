import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Navigation from './Navigation';
import useLocalStorage from './hooks/useLocalStorage';
import Routes from './Routes';
import JoblyApi from './JoblyApi';
import { decode } from 'jsonwebtoken';
import UserContext from './UserContext';

const TOKEN_STORAGE_ID = 'jobly-token';

const App = () => {
	// State
	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState(null);

	// Get the token from the API that is stored in local storage
	const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

	useEffect(
		() => {
			async function getCurrentUser() {
				try {
					// Get the username from the token
					let { username } = decode(token);

					// Get the current user
					let currentUser = await JoblyApi.getCurrentUser(username);

					// Set the current user
					setCurrentUser(currentUser);
				} catch (err) {
					setCurrentUser(null);
				}
				setIsLoaded(true);
			}
			setIsLoaded(false);
			getCurrentUser();
		},
		[ token ]
	);

	const handleLogout = () => {
		// Reset state variables to null
		setCurrentUser(null);
		setToken(null);
	};

	// Display a loading icon if loading
	if (!isLoaded) {
		return (
			<div className="text-center">
				<Spinner color="primary" />
			</div>
		);
	}

	return (
		<Router>
			<UserContext.Provider value={{ currentUser, setCurrentUser }}>
				<Navigation logout={handleLogout} />
				<Routes setToken={setToken} />
			</UserContext.Provider>
		</Router>
	);
};

export default App;
