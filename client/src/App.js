import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import JobListing from "./pages/JobListing";
import JobDetails from "./pages/JobDetails";
import JobForm from "./pages/JobForm";
import { IdentityProvider } from "./contexts/Identity";

const App = () => {
	return (
		<IdentityProvider>
			<Menu />
			<div>
				<Switch>
					<Route exact path="/signup" component={ Signup } />
					<Route exact path="/login" component={ Login } />
					<Route exact path="/" component={ JobListing } />
					<Route exact path="/new" component={ JobForm } />
					<Route exact path="/:slug" component={ JobDetails } />
					<Route exact path="/edit/:slug" component={ JobForm } />
				</Switch>
			</div>
		</IdentityProvider>
	);
};

export default App;