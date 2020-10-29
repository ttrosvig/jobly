import React from 'react';
import './CompanyCard.css';

const Card = ({ company }) => {
	return (
		<div className="Card">
			<h5>{company.name}</h5>
			<p>{company.description}</p>
		</div>
	);
};

export default Card;
