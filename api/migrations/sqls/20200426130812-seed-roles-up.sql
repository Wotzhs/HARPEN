/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO roles (id, name) VALUES (uuid_generate_v4(), 'recruiter'), (uuid_generate_v4(), 'candidate');