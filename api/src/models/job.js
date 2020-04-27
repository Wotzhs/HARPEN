import slugify from "slugify";

class Job {
	static INCORRECT_INSTANCE_MSG = "argument job not an instance of Job";

	constructor({ id, slug, title, location, description, posting_date, status, jd_file, user_id }) {
		this.id = id;
		this.slug = slug;
		this.title = title;
		this.location = location;
		this.description = description;
		this.posting_date = posting_date;
		this.status = status;
		this.jd_file = jd_file;
		this.user_id = user_id;
	}

	slugify(counter) {
		this.slug = slugify(this.title);
		if (counter) {
			this.slug += `-${counter}`;
		}
	}

	validate({extraFields = []} = {}) {
		const error = {};
		if (!this.title) {
			error.title = "missing title";
		}
		if (!this.location) {
			error.location = "missing location";
		}
		if (!this.description) {
			error.description = "missing description";
		}
		if (!this.posting_date) {
			error.posting_date = "missing posting_date";
		}
		if (!this.user_id) {
			error.user_id = "missing user_id";
		}

		for (let i = 0; i < extraFields.length; i++) {
			if (!this[extraFields[i]]) {
				error[extraFields[i]] = `missing ${extraFields[i]}`
			}
		}

		return Object.keys(error).length > 0 ? error : null;
	}
}

export default Job;