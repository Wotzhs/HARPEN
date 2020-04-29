import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import { IdentityContext } from "../contexts/Identity";

const JobForm = ({ match, history }) => {
	const { isLoggedIn } = useContext(IdentityContext);
	if (!isLoggedIn) {
		history.push("/login");
	}

	const [ formValues, setFormValues ] = useState({});
	const [ errors, setErrors ] = useState({});

	const handleChange = e => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleStatusChange = e => {
		setFormValues({ ...formValues, [e.target.name]: e.target.checked });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!formValues.posting_date) {
			formValues.posting_date = new Date();
		}

		if (formValues.status === undefined) {
			formValues.status = true;
		}

		const isEdit = match.params && match.params.slug;

		try {
			const res = isEdit
				? await axios.put("/api/jobs", { ...formValues })
				: await axios.post("/api/jobs", { ...formValues });

			history.push(`/${res.data.slug}`);
		} catch (e) {
			setErrors({ ...errors, ...(e.response.data) });
		}
	};

	const setPostDate = date => {
		setFormValues({ ...formValues, posting_date: date });
	};

	const fetchJobDetails = async () => {
		if (!match.params.slug) {
			setFormValues({});
			return;
		}
		try {
			const res = await axios.get(`/api/jobs/${ match.params.slug }`);
			setFormValues({ ...formValues, ...(res.data) });
		} catch (e) {
			setErrors({ ...errors, ...(e.response.data) });
		}
	};

	useEffect(()=> {
		(async () => await fetchJobDetails())();
	}, [ match.params.slug ]);

	return (
		<form onSubmit={ handleSubmit } className="wider-width auto-margin">
			<div className="content">
				<h1 className="has-text-centered">Add a new job</h1>
			</div>

			<div className="field">
				<label className="label">Title</label>
				<div className="control">
					<input
						className="input"
						type="text"
						placeholder="Senior Mechanic"
						name="title"
						value={ formValues.title || "" }
						onChange={ handleChange }
					/>
				</div>
			</div>

			<div className="field">
				<label className="label">Location</label>
				<div className="control">
					<input
						className="input"
						type="text"
						placeholder="Text input"
						name="location"
						value={ formValues.location || "" }
						onChange={ handleChange }
					/>
				</div>
			</div>

			<div className="field">
				<label className="label">Description</label>
				<div className="control">
					<textarea
						className="textarea"
						placeholder="e.g. Need to have 30 years of experience"
						name="description"
						value={ formValues.description || "" }
						onChange={ handleChange }
					>
					</textarea>
				</div>
			</div>

			<div className="field is-grouped">
				<div className="control">
					<div className="field is-grouped flex-align-baseline">
						<label className="has-small-right-margin">Post Date</label>
						<DatePicker
							name="date"
							onChange={ setPostDate }
							value={ formValues.posting_date || new Date() }
							format="dd-MM-y"
						/>
					</div>
				</div>
				<div className="field is-flex flex-align-baseline">
					<input
						id="status"
						type="checkbox"
						name="status"
						className="switch is-rtl"
						onChange={ handleStatusChange }
						checked={ formValues.status || match.path === "/new" }
					/>
					<label htmlFor="status">Is job active?</label>
				</div>
			</div>



			<div className="field is-grouped">
				<div className="control">
					<button className="button is-primary">Add Job</button>
				</div>
				<div className="control">
					<button
						onClick={ () => history.goBack() }
						className="button is-link is-light"
						type="button"
					>
						Cancel
					</button>
				</div>
			</div>
		</form>
	);
};

export default JobForm;