import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
	return (
		<div className="is-flex full-height center-center">
			<form action="" className="wide-width">
				<div className="field">
					<label className="label">Email</label>
					<div className="control">
						<input className="input" type="text" name="email" placeholder="john@doe.com" />
					</div>
				</div>

				<div className="field">
					<label className="label">Password</label>
					<div className="control">
						<input className="input" type="password" name="password" placeholder="" />
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