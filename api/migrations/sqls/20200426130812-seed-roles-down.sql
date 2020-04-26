/* Replace with your SQL commands */
DROP EXTENSION IF EXISTS "uuid-ossp";
DELETE FROM roles WHERE name = 'recruiter' OR name = 'candidate';