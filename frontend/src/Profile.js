import React, { useState, useContext } from 'react';
import { Alert } from 'reactstrap';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';

function Profile() {
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const [ userForm, setUserForm ] = useState({
		first_name: currentUser.first_name || '',
		last_name: currentUser.last_name || '',
		email: currentUser.email || '',
		photo_url: currentUser.photo_url || '',
		username: currentUser.username,
		password: '',
		errors: [],
		saveConfirmed: false
	});

	async function handleSubmit(evt) {
		evt.preventDefault();

		try {
			let profileData = {
				first_name: userForm.first_name || undefined,
				last_name: userForm.last_name || undefined,
				email: userForm.email || undefined,
				photo_url: userForm.photo_url || undefined,
				password: userForm.password,
				_token: localStorage.getItem('jobly-token')
			};

			let username = userForm.username;
			let updatedUser = await JoblyApi.saveProfile(username, profileData);
			setUserForm((f) => ({
				...f,
				errors: [],
				saveConfirmed: true,
				password: ''
			}));
			setCurrentUser(updatedUser);
		} catch (errors) {
			setUserForm((f) => ({ ...f, errors }));
		}
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setUserForm((f) => ({
			...f,
			[name]: value,
			errors: []
		}));
	}

	return (
		<div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
			<h3>Profile</h3>
			<div className="card">
				<div className="card-body">
					<form>
						<div className="form-group">
							<label>Username</label>
							<p className="form-control-plaintext">{userForm.username}</p>
						</div>
						<div className="form-group">
							<label>First Name</label>
							<input name="first_name" className="form-control" value={userForm.first_name} onChange={handleChange} />
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<input name="last_name" className="form-control" value={userForm.last_name} onChange={handleChange} />
						</div>
						<div className="form-group">
							<label>Email</label>
							<input name="email" className="form-control" value={userForm.email} onChange={handleChange} />
						</div>
						<div className="form-group">
							<label>Photo URL</label>
							<input name="photo_url" className="form-control" value={userForm.photo_url} onChange={handleChange} />
						</div>
						<div className="form-group">
							<label>Confirm password to make changes:</label>
							<input
								type="password"
								name="password"
								className="form-control"
								value={userForm.password}
								onChange={handleChange}
							/>
						</div>

						{userForm.errors ? (
							userForm.errors.map((error, idx) => (
								<Alert key={idx} color="danger">
									{error}
								</Alert>
							))
						) : null}

						{userForm.saveConfirmed ? <Alert color="success">User updated successfully</Alert> : null}

						<button className="btn btn-primary btn-block mt-4" onClick={handleSubmit}>
							Save Changes
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Profile;
