import { v4 as uuidV4 } from "uuid";
import Job from "../models/job";
import pool from "../db";

class JobsService {
	static async createJob(job) {
		if (job instanceof Job === false) {
			return Error(Job.INCORRECT_INSTANCE_MSG);
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