import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';

const Company = () => {
	const { handle } = useParams();
	const [ jobs, setJobs ] = useState([]);
	const [ company, setCompany ] = useState([]);

	useEffect(
		() => {
			async function getData() {
				const company_result = await JoblyApi.getCompany(handle);

				const job_result = company_result.jobs;

				setJobs(job_result);
				setCompany(company_result);
			}
			getData();
		},
		[ handle ]
	);

	async function apply(id) {
		let message = await JoblyApi.applyToJob(id);
		setJobs((j) => j.map((job) => (job.id === id ? { ...job, state: message } : job)));
	}

	return (
		<div className="container">
			<h5>{company.name}</h5>
			<p>{company.description}</p>

			{jobs.map((job) => {
				return <JobCard job={job} key={job.id} id={job.id} apply={apply} />;
			})}
		</div>
	);
};

export default Company;
