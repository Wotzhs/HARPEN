class AuthError extends Error {
	constructor(...params) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AuthError);
		}

		this.name = "AuthError";
	}

	static get PASSWORD_EMAIL_MISMATCH_MSG() {
		return "email or password is incorrect";
	}

	static get MISSING_PASSWORD_OR_EMAIL_MSG() {
		return "missing email or password";
	}
}

class RecordNotFoundError extends Error {
	constructor(...params) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RecordNotFoundError);
		}

		this.name = "RecordNotFoundError";
	}
}

export {
	AuthError,
	RecordNotFoundError,
};