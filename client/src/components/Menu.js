import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IdentityContext } from "../contexts/Identity";

const Menu = () => {
	const { isLoggedIn, setIdentity } = useContext(IdentityContext);

	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<Link to={ "/" } className="navbar-item">
					<h1 className="is-size-3 has-text-weight-bold">H <s>A</s> R P E N</h1>
				</Link>

				<a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				{ isLoggedIn &&
					<div className="navbar-start">
						<a className="navbar-item">Dashboard</a>
					</div>
				}

				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							{ !isLoggedIn &&
								<React.Fragment>
									<Link to={ "/signup" } className="button is-primary">
										<strong>Sign up</strong>
									</Link>
									<Link to={ "/login" } className="button is-light">
										Log in
									</Link>
								</React.Fragment>
							}
							{ isLoggedIn &&
								<button className="button is-danger" onClick={ () => setIdentity(null) }>
									Log out
								</button>
							}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Menu;