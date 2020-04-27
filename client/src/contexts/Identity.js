import React, { useReducer, useEffect } from "react";

const reducer = (identity, newIdentity) => {
	if (newIdentity === null) {
		localStorage.removeItem("identity");
		return {};
	}
	return { ...identity, ...newIdentity };
};

const IdentityContext = React.createContext();

const IdentityProvider = props => {
	const persistedIdentity = JSON.parse(localStorage.getItem("identity"));
	const [ identity, setIdentity ] = useReducer(reducer, persistedIdentity || {});
	const isLoggedIn = Object.keys(identity).length > 0;

	useEffect(() => {
		localStorage.setItem("identity", JSON.stringify(identity));
	}, [ identity ]);

	return (
		<IdentityContext.Provider value={{ identity, setIdentity, isLoggedIn }}>
			{ props.children }
		</IdentityContext.Provider>
	);
};

export { IdentityContext, IdentityProvider };