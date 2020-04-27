/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS jobs (
	id UUID PRIMARY KEY,
	slug VARCHAR NOT NULL UNIQUE,
	title VARCHAR NOT NULL,
	location VARCHAR,
	description VARCHAR,
	posting_date TIMESTAMP NOT NULL,
	status BOOLEAN default false,
	jd_file VARCHAR,
	user_id UUID REFERENCES users(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX jobs_slug_ix ON jobs (slug);
CREATE INDEX jobs_posting_date_ix ON jobs (posting_date);
CREATE INDEX jobs_posting_date_status_ix ON jobs (posting_date, status);
CREATE INDEX jobs_status_ix ON jobs (status);
CREATE INDEX jobs_user_id_ix ON jobs (user_id);
CREATE INDEX jobs_location_ix ON jobs (location);