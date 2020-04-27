import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IdentityContext } from "../contexts/Identity";

const Login = ({ history }) => {
	const [ formValues, setFormValues ] = useState({});
	const [ errors, setErrors ] = useState({});
	const { setIdentity } = useContext(IdentityContext);

	const handleChange = e => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const res = await axios.post("/api/auth", { ...formValues });
			setIdentity({ ...res.data });
			history.push("/");
		} catch (e) {
			setErrors({ ...errors, ...(e.response.data) });
		}
	};

	return (
		<div className="is-flex full-height center-center">
			<form onSubmit={ handleSubmit } className="wide-width">
				<div className="field">
					<label className="label">Email</label>
					<div className="control">
						<input
							className="input"
							type="email"
							name="email"
							placeholder="john@doe.com"
							value={ formValues.email || "" }
							onChange={ handleChange }
						/>
					</div>
				</div>

				<div className="field">
					<label className="label">Password</label>
					<div className="control">
						<input
							className="input"
							type="password"
							name="password"
							value={ formValues.password || "" }
							onChange={ handleChange }
						/>
					</div>
					{ errors && <p className="help is-danger">{ errors.error }</p> }
				</div>

				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link">Login</button>
					</div>
					<Link className="button is-link is-light" to={ "/" }>Cancel</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;