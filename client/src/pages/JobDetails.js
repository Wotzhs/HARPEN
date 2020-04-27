import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import parseISO from "date-fns/parseISO";
import formatRelative from "date-fns/formatRelative";
import { IdentityContext } from "../contexts/Identity";

const JobDetails = ({ match }) => {
	const [ job, setJob ] = useState({});
	const [ errors, setErrors ] = useState({});
	const { identity } = useContext(IdentityContext);

	const fetchDetails = async () => {
		try {
			const res = await axios.get(`/api/jobs/${ match.params.slug }`);
			setJob({ ...job, ...(res.data) });
		} catch (e) {
			setErrors({ ...errors, ...(e.response.data) });
		}
	};

	useEffect(()=> {
		(async () => await fetchDetails())();
	}, []);

	return (
		<div>
			<section className="hero is-primary is-bold">
				<div className="hero-body">
					<div className="container">
						<h1 className="title">
							{ job.title }
						</h1>
						<small>Located at { job.location }</small>
						<br/>
						{ job && job.posting_date &&
							<small>
								Posted <u>{ formatRelative(parseISO(job.posting_date), Date.now()) }</u> by
								<b><a className="has-text-white" href={`mailto:${ job.email }`}>
									{" "}{ job.email }
								</a></b>
							</small>
						}
					</div>
				</div>
			</section>
			<br/>
			<section className="container is-fluid">
				<div className="content">
					<div className="is-flex flex-space-between">
						<h2>Description</h2>
						{ identity.email === job.email &&
							<Link
								className="button is-primary is-outlined"
								to={ `/edit/${ job.slug }` }
							>
								Edit Job Details
							</Link>
						}
					</div>
					<p>{ job.description }</p>
				</div>
			</section>
		</div>
	);
};

export default JobDetails;