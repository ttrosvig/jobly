import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Companies from './Companies';
import Home from './Home';
import Company from './Company';
import Jobs from './Jobs';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import PrivateRoute from './PrivateRoute';

const Routes = ({ setToken }) => {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/login">
				<Login setToken={setToken} />
			</Route>
			<Route exact path="/register">
				<Register setToken={setToken} />
			</Route>
			<PrivateRoute exact path="/profile">
				<Profile />
			</PrivateRoute>
			<PrivateRoute exact path="/companies">
				<Companies />
			</PrivateRoute>
			<PrivateRoute exact path="/companies/:handle">
				<Company />
			</PrivateRoute>
			<PrivateRoute exact path="/jobs">
				<Jobs />
			</PrivateRoute>
			<Route>
				<div
					className="container d-flex justify-content-center align-items-center flex-column"
					style={{ height: '80vh' }}
				>
					<h1>Page not found...</h1>
				</div>
			</Route>
		</Switch>
	);
};

export default Routes;
