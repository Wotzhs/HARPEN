import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IdentityContext } from "../contexts/Identity";

const Signup = ({ history }) => {
	const [ formValues, setFormValues ] = useState({});
	const [ errors, setErrors ] = useState({});
	const [ showSuccessMsg, setShowSuccessMsg ] = useState(false);
	const { isLoggedIn } = useContext(IdentityContext);
	if (isLoggedIn) {
		history.push("/");
	}

	const handleChange = e => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setErrors(null);

		if (formValues.password !== formValues.confirm_password) {
			setErrors({ ...errors, confirm_password: "Passwords did not match" });
			return;
		}

		try {
			await axios.post("/api/users", {
				email: formValues.email,
				password: formValues.password,
				user_type: formValues.recruiter ? "recruiter" : "candidate",
			});

			setShowSuccessMsg(true);
		} catch (e) {
			setErrors({ ...errors, ...e.response.data.errors });
		}
	};

	return (
		<div className="is-flex full-height center-center">
			{ showSuccessMsg &&
				<div className="notification is-success">
					<button onClick={ () => setShowSuccessMsg(false) } className="delete"></button>
					Account registration is successful, login to your account <Link to={"/login"}>here</Link>
				</div>
			}

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
					{ errors && errors.email && <p className="help is-danger">{ errors.email }</p> }
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
					{ errors && errors.password &&
						errors.password.map((err, i) => {
							return <p key={i} className="help is-danger">{ err }</p>;
						})

					}
				</div>

				<div className="field">
					<label className="label">Confirm Password</label>
					<div className="control">
						<input
							className="input"
							type="password"
							name="confirm_password"
							value={ formValues.confirm_password || "" }
							onChange={ handleChange }
						/>
					</div>
					{ errors && errors.confirm_password &&
						<p className="help is-danger">{ errors.confirm_password }</p>
					}
				</div>

				<div className="field">
					<div className="control">
						<label className="checkbox">
							<input
								type="checkbox"
								name="recruiter"
								onChange={ handleChange }
								defaultChecked
							/>
							{" "}I am a recruiter
						</label>
					</div>
				</div>

				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link">Sign Up</button>
					</div>
					<Link className="button is-link is-light" to={ "/" }>Cancel</Link>
				</div>
			</form>
		</div>
	);
};

export default Signup;