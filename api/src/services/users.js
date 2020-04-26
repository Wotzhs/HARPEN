import { v4 as uuidV4 } from "uuid";
import pool from "../db";
import User from "../models/user";
import { RecordNotFoundError } from "../models/error";

class UsersService {
	static async createUser(user) {
		if (user instanceof User === false) {
			return Error("argument user must be an instance of user");
		}

		const passwordHash = await user.getPasswordHash();
		if (passwordHash instanceof Error) {
			return passwordHash;
		}

		try {
			await pool.query(
				"INSERT INTO users (id, email, password_hash, role_id) VALUES ($1, $2, $3, $4)",
				[ uuidV4(), user.email, passwordHash, user.role_id ],
			);
		} catch (e) {
			return e;
		}
	}

	static async existsUser(user) {
		if (user instanceof User === false) {
			return Error(User.NOT_USER_INSTANCE_MSG);
		}

		try {
			const exists = await pool.query("SELECT id from users WHERE email=$1", [ user.email ]);
			return exists.rowCount > 0;
		} catch (e) {
			return e;
		}
	}

	static async getUserByEmail(email) {
		try {
			const result = await pool.query(
				`
				SELECT users.id, users.email, users.password_hash, roles.name role_name
				FROM users
				LEFT JOIN roles
					ON users.role_id = roles.id
				WHERE users.email = $1
				`, [ email ]
			);

			if (result.rowCount < 1) {
				throw new RecordNotFoundError("user not found");
			}

			return result.rows[0];
		} catch (e) {
			return e;
		}
	}
}

export default UsersService;