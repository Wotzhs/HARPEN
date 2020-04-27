import { v4 as uuidV4 } from "uuid";
import Job from "../models/job";
import pool from "../db";

class JobsService {
	static async createJob(job) {
		if (job instanceof Job === false) {
			return Error(Job.INCORRECT_INSTANCE_MSG);
		}

		const { slug, title, location, description, posting_date, status, jd_file, user_id } = job;

		// generate unique slug
		try {
			const result = await pool.query(
				"SELECT slug FROM jobs WHERE slug LIKE $1 ORDER BY slug DESC LIMIT 1",
				[ `${slug}%` ]
			);

			if (result.rowCount > 0) {
				const counter = result.rows[0].slug.split("-").pop();
				job.slugify(counter*1+1);
			}
		} catch (e) {
			return e;
		}

		// insert job
		try {
			const result = await pool.query(
				`
				INSERT INTO jobs(id, slug, title, location, description, posting_date, status, jd_file, user_id) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
				RETURNING id
				`,
				[ uuidV4(), job.slug, title, location, description, posting_date, status, jd_file, user_id ]
			);
			return result.rows[0].id;
		} catch (e) {
			return e;
		}
	}

	static async updateJob(job) {
		if (job instanceof Job === false) {
			return Error(Job.INCORRECT_INSTANCE_MSG);
		}
	}

	static async getJobBySlug(slug) {

	}

	static async deleteJob(id) {

	}
}

export default JobsService;