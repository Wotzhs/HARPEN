class AuthError extends Error {
	static PASSWORD_EMAIL_MISMATCH_MSG = "email or password is incorrect";
	static MISSING_PASSWORD_OR_EMAIL_MSG = "missing email or password";

	constructor(...params) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AuthError);
		}

		this.name = "AuthError";
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