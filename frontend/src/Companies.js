import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import { Spinner } from 'reactstrap';
import JoblyApi from './JoblyApi';
import Search from './Search';

const Companies = () => {
	const [ companies, setCompanies ] = useState([]);

	async function searchFunc(term) {
		let results = await JoblyApi.getCompanies(term);

		setCompanies(results);
	}

	useEffect(() => {
		async function getData() {
			let result = await JoblyApi.getCompanies();

			setCompanies(result);
		}
		getData();
	}, []);
	return (
		<div className="container">
			<Search func={searchFunc} />
			<div className="text-center">{companies.length === 0 ? <Spinner color="primary" /> : null}</div>
			{companies.map((company) => {
				return (
					<div key={uuid()}>
						<Link to={`/companies/${company.handle}`}>
							<CompanyCard company={company} />
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Companies;
