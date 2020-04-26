/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
	id UUID PRIMARY KEy,
	email VARCHAR NOT NULL UNIQUE,
	password_hash VARCHAR NOT NULL,
	role_id UUID REFERENCES roles(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX email_ix ON users (email);