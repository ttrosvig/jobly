import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import UserContext from './UserContext';

const Navigation = ({ logout }) => {
	const { currentUser } = useContext(UserContext)
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const loggedInNav = () => {
		return (
			<>
				<NavItem>
					<Link to="/" className="Navigation-link">
						Home
					</Link>
				</NavItem>
				<NavItem>
					<Link to="/companies" className="Navigation-link">
						Companies
					</Link>
				</NavItem>
				<NavItem>
					<Link to="/jobs" className="Navigation-link">
						Jobs
					</Link>
				</NavItem>
				<NavItem>
					<Link to="/profile" className="Navigation-link">
						Profile
					</Link>
				</NavItem>
				<NavItem>
					<a href="/login" onClick={logout} className="Navigation-link">
						Logout
					</a>
				</NavItem>
			</>
		);
	};

	const loggedOutNav = () => {
		return (
			<>
				<NavItem>
					<Link to="/login" className="Navigation-link">
						Login
					</Link>
				</NavItem>
				<NavItem>
					<Link to="/register" className="Navigation-link">
						Register
					</Link>
				</NavItem>
			</>
		);
	};

	return (
		<>
			<Navbar color="dark" dark expand="md" className="mb-4">
				<Link className="Navigation-link title" to="/">
					Jobly
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{currentUser ? loggedInNav() : loggedOutNav()}
					</Nav>
				</Collapse>
			</Navbar>
		</>
	);
};

export default Navigation;
