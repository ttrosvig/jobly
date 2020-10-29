import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import UserContext from './UserContext';
import './Home.css';

const Home = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<div className="container Home">
			<h1>Jobly</h1>
			<p>All the jobs in one, convenient place.</p>
			{currentUser ? (
				<h3>Welcome Back!</h3>
			) : (
				<Link to="/login">
					<Button color="primary">Log in</Button>
				</Link>
			)}
		</div>
	);
};

export default Home;
