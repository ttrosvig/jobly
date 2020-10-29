import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import JoblyApi from './JoblyApi';

const INIT_STATE = {
	username: '',
	password: ''
};

const Login = ({ setToken }) => {
	const [ formData, setFormData ] = useState(INIT_STATE);
	let history = useHistory();

	const handleChange = (evt) => {
		const { name, value } = evt.target;

		setFormData((data) => ({
			...data,
			[name]: value
		}));
	};

	async function handleSubmit(evt) {
		evt.preventDefault();

		let token;
		try {
			token = await JoblyApi.login(formData);
		} catch (errors) {
			return setFormData((data) => ({ ...data, errors }));
		}

		setToken(token);
		history.push('/');
	}

	return (
		<div className="container">
			<h1>Login</h1>
			<p>
				Login or <Link to="/register">register</Link> to view current job openings.
			</p>
			{formData.errors ? (
				formData.errors.map((error, idx) => (
					<Alert key={idx} color="danger">
						{error}
					</Alert>
				))
			) : null}
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input autoFocus type="text" name="username" id="username" onChange={handleChange} />
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input type="password" name="password" id="password" onChange={handleChange} />
				</FormGroup>
				<div className="text-right">
					<Button color="success">Log in</Button>
				</div>
			</Form>
		</div>
	);
};

export default Login;
