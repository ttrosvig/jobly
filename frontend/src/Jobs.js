import React, { useState, useEffect } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import './JobCard.css';
import { Spinner } from 'reactstrap';
import Search from './Search';

const Jobs = () => {
	const [ jobs, setJobs ] = useState([]);

	async function searchFunc(term) {
		const result = await JoblyApi.getJobs(term);

		setJobs(result);
	}

	useEffect(() => {
		async function getData() {
			const jobs_results = await JoblyApi.getJobs();

			setJobs(jobs_results);
		}
		getData();
	}, []);

	async function apply(id) {
		let message = await JoblyApi.applyToJob(id);
		setJobs((j) => j.map((job) => (job.id === id ? { ...job, state: message } : job)));
	}

	return (
		<div className="container">
			<Search func={searchFunc} />
			<div className="text-center">{jobs.length === 0 ? <Spinner color="primary" /> : null}</div>
			{jobs.map((job) => {
				return <JobCard job={job} key={job.id} id={job.id} apply={apply} />;
			})}
		</div>
	);
};

export default Jobs;
