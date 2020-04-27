import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import parseISO from "date-fns/parseISO";
import formatRelative from "date-fns/formatRelative";

const JobListing = () => {
	const [ jobs, setJobs ] = useState({});
	const [ errors, setErrors ] = useState({});

	const fetchListing = async () => {
		try{
			const res = await axios.get("/api/jobs");
			setJobs({ ...jobs, ...(res.data) });
		} catch (e) {
			const { data } = e.response;
			setErrors({ ...errors, data });
		}
	};

	useEffect(() => {
		(async () => await fetchListing())();
	}, []);

	return (
		<div className="container is-fluid">
			{ jobs && jobs.results &&
				jobs.results.map(job => {
					return (
						<div className="box" key={ job.slug }>
							<article className="media">
								<div className="media-left">
									<Link to={ job.slug }>
										<figure className="image is-64x64">
											<img src={ `https://picsum.photos/seed/${Math.random()}/128`} alt="Image" />
										</figure>
									</Link>
								</div>
								<div className="media-content">
									<div className="content">
										<p>
											<Link to={ job.slug }>
												<strong>{ job.title }</strong>
											</Link> @ <small>{ job.location }</small>
											<br />

											{ job.description }

											<br/>
											<small>{ formatRelative(parseISO(job.posting_date), Date.now()) }</small>
										</p>
									</div>
								</div>
							</article>
						</div>
					);
				})
			}
		</div>
	);
};

export default JobListing;