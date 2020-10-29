import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import JoblyApi from './JoblyApi';

const INIT_STATE = {
	username: '',
	password: '',
	first_name: '',
	last_name: ''
};

const Register = ({ setToken }) => {
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
			token = await JoblyApi.register(formData);
		} catch (errors) {
			return setFormData((data) => ({ ...data, errors }));
		}

		setToken(token);
		history.push('/');
	}

	return (
		<div className="container">
			<h1>Register</h1>
			<p>
				Register or <Link to="/login">login</Link> to view current job openings.
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
				<FormGroup>
					<Label for="first_name">First Name</Label>
					<Input type="text" name="first_name" id="first_name" onChange={handleChange} />
				</FormGroup>
				<FormGroup>
					<Label for="last_name">Last Name</Label>
					<Input type="text" name="last_name" id="last_name" onChange={handleChange} />
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input type="email" name="email" id="email" onChange={handleChange} />
				</FormGroup>
				<div className="text-right">
					<Button color="success">Register</Button>
				</div>
			</Form>
		</div>
	);
};

export default Register;
