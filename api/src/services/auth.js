import bcrypt from "bcrypt";
import User from "../models/user";
import { JWT, JWK } from "jose";
import { AuthError } from "../models/error";

class AuthService {
	static async generateToken(user, password) {
		if (user instanceof User === false) {
			return Error(User.NOT_USER_INSTANCE_MSG);
		}

		try {
			const matched = await bcrypt.compare(password, user.password_hash);
			if (!matched) {
				throw new AuthError(AuthError.PASSWORD_EMAIL_MISMATCH_MSG);
			}

			const payload = { user_id: user.id, email: user.email };
			const key = JWK.asKey(process.env.JWT_SECRET);

			return JWT.sign(payload, key, { expiresIn: "1d" });
		} catch (e) {
			return e;
		}
	}
}

export default AuthService;