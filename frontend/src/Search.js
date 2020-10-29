import React, { useState } from 'react';
import { Button, Input, Form } from 'reactstrap';
import './Search.css';

const Search = ({ func }) => {
	const [ search, setSearch ] = useState('');

	const handleChange = (evt) => {
		setSearch(evt.target.value);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		func(search);
	};

	return (
		<div>
			<Form onSubmit={handleSubmit} inline>
				<Input
					name="search"
					value={search}
					onChange={handleChange}
					type="text"
					placeholder="Enter search term..."
					className="Search-input"
				/>
				<Button className="Search-button" color="primary">
					<i className="fas fa-search" />
				</Button>
			</Form>
		</div>
	);
};

export default Search;
