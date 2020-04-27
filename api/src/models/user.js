import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";
import { PasswordStrength } from "tai-password-strength";

const SALT_ROUNDS = 10;

class User {
	static INCORRECT_INSTANCE_MSG = "argument user not an instance of user";

	constructor({ id, email, password, password_hash, role_id, role_name }) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.password_hash = password_hash;
		this.role_id = role_id;
		this.role_name = role_name;
	}

	async getPasswordHash() {
		try {
			return await bcrypt.hash(this.password, SALT_ROUNDS);
		} catch (e) {
			return e;
		}
	}

	validate() {
		const error = {};
		if (!isEmail(this.email)) {
			error.email = "invalid email";
		}

		const { charsets, passwordLength } = PasswordStrength().check(this.password);
		if (passwordLength < 8) {
			error.password = [ ...(error.password || []), "password must be at least 8 character long" ];
		}

		if (!charsets.number) {
			error.password = [ ...(error.password || []), "password must contain at least 1 number" ];
		}

		if (!charsets.lower) {
			error.password = [ ...(error.password || []), "password must contain at least 1 lower case alphabet" ];
		}

		if (!charsets.upper) {
			error.password = [ ...(error.password || []), "password must contain at least 1 upper case alphabet" ];
		}

		if (!charsets.symbol) {
			error.password = [ ...(error.password || []), "password must contain at least 1 symbol" ];
		}

		if (!this.role_id) {
			error.role_id = "invalid role_id";
		}

		return Object.keys(error).length > 0 ? error : null;
	}
}

export default User;