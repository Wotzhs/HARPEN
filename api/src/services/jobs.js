import { v4 as uuidV4 } from "uuid";
import Job from "../models/job";
import Role from "../models/role";
import pool from "../db";
import { RecordNotFoundError } from "../models/error";

class JobsService {
	static async createJob(job) {
		if (job instanceof Job === false) {
			return Error(Job.INCORRECT_INSTANCE_MSG);
		}

		job.slugify();

		const { slug, title, location, description, posting_date, status, jd_file, user_id } = job;

		// generate unique slug
		try {
			const result = await pool.query(
				"SELECT slug FROM jobs WHERE slug LIKE $1 ORDER BY slug DESC LIMIT 1",
				[ `${slug}%` ]
			);

			if (result.rowCount > 0) {
				let counter = result.rows[0].slug.split("-").pop();
				if (isNaN(counter)) {
					counter = 0;
				}
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
				RETURNING id, slug
				`,
				[ uuidV4(), job.slug, title, location, description, posting_date, status, jd_file, user_id ]
			);

			return result.rows[0];
		} catch (e) {
			return e;
		}
	}

	static async updateJob({ updatedJob }) {
		if (updatedJob instanceof Job === false) {
			return Error(Job.INCORRECT_INSTANCE_MSG);
		}

		const { title, location, description, posting_date, status, jd_file, slug, user_id } = updatedJob;

		try {
			const result = await pool.query(
				`
				UPDATE jobs SET title=$1, location=$2, description=$3, posting_date=$4, status=$5, jd_file=$6
				WHERE user_id=$7 and slug=$8
				RETURNING slug
				`,
				[ title, location, description, posting_date, status, jd_file, user_id, slug ]
			);

			if (result.rowCount < 1) {
				throw new RecordNotFoundError("record not found or not authorised to make changes");
			}
			return result.rows[0];
		} catch (e) {
			return e;
		}
	}

	static async getJobBySlug({ slug, role_name }) {
		try {
			let sql = `
				SELECT j.title, j.slug, j.location, j.description, j.posting_date, j.jd_file, j.status, u.email
				FROM jobs j
				LEFT JOIN users u on j.user_id = u.id
				WHERE j.slug = $1
			`;

			if (role_name !== Role.RECRUITER) {
				sql += "AND j.status <> false";
			}

			const result = await pool.query(sql, [ slug ]);
			if (result.rowCount < 1) {
				throw new RecordNotFoundError("the requested url is not found");
			}

			return result.rows[0];
		} catch (e) {
			return e;
		}
	}

	static async getJobList({ offset, limit, role_name }) {
		try {
			let sql = `
				SELECT j.slug, j.title, j.location, j.description, j.posting_date, j.jd_file, j.status, u.email
				FROM jobs j
				LEFT JOIN users u on j.user_id = u.id
			`;

			let countSql = "SELECT COUNT(id) FROM jobs ";

			if (role_name !== Role.RECRUITER) {
				sql += "WHERE j.status <> false ";
				countSql += "WHERE status <> false ";
			}

			sql += "ORDER BY j.posting_date DESC ";

			let params;
			if (offset && limit) {
				sql += "LIMIT $1 OFFSET $2";
				params = [ limit, offset ];
			}

			const result = await pool.query(sql, params);
			const totalCount = await pool.query(countSql);

			return { total_count: totalCount.rows[0].count*1, results: result.rows, page: offset, limit };
		} catch (e) {
			return e;
		}
	}

	static async getOwnJobList({ offset, limit, user_id }) {
		try {
			const result = await pool.query(
				`
				SELECT j.slug, j.title, j.location, j.description, j.posting_date, j.jd_file, j.status, u.email
				FROM jobs j
				LEFT JOIN users u on j.user_id = u.id
				WHERE j.user_id = $1
				ORDER BY j.posting_date DESC
				`,
				[ user_id ]
			);

			const totalCount = await pool.query("SELECT COUNT(id) from jobs WHERE user_id = $1", [ user_id ]);

			return { total_count: totalCount.rows[0].count*1, results: result.rows, page: offset, limit };
		} catch (e) {
			return e;
		}
	}

	static async deleteJob({ slug, user_id }) {
		try {
			return await pool.query(
				"DELETE FROM jobs WHERE slug = $1 and user_id = $2",
				[ slug, user_id ]
			);
		} catch (e) {
			return e;
		}
	}
}

export default JobsService;