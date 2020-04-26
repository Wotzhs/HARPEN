import pool from "../db";

class RolesService {
	static async getRecruiterRoleId() {
		try {
			const result = await pool.query("SELECT id FROM roles WHERE name='recruiter'");
			return result.rows[0].id;
		} catch (e) {
			return e;
		}
	}

	static async getCandidateRoleId() {
		try {
			const result = await pool.query("SELECT id FROM roles WHERE name='candidate'");
			return result.rows[0].id;
		} catch (e) {
			return e;
		}
	}
}

export default RolesService;