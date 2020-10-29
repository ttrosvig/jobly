import React from 'react';
import './JobCard.css';
import { Button } from 'reactstrap';

const JobCard = ({ job, id, apply }) => {
	return (
		<div className="JobCard">
			<h5>{job.title}</h5>
			<p>Salary: ${job.salary}</p>
			<p>Equity: {job.equity}</p>
			<div className="text-right">
				<Button onClick={() => apply(id)} color={job.state ? 'success' : 'primary'}>
					{job.state ? 'Applied' : 'Apply'}
				</Button>
			</div>
		</div>
	);
};

export default JobCard;
