import express from "express";
import HttpStatus from "http-status-codes";
import User from "../models/user";
import Role from "../models/role";
import RolesService from "../services/roles";
import UsersService from "../services/users";

const router = express.Router();

router.post("/", async (req, res, next) => {
	const { email, password, user_type } = req.body;

	if (user_type !== Role.RECRUITER && user_type !== Role.CANDIDATE) {
		res.status(HttpStatus.BAD_REQUEST);
		return res.json({ error: `user_type must be either '${ Role.RECRUITER }' or '${ Role.CANDIDATE }` });
	}

	const role_id = user_type === "recruiter"
		? await RolesService.getRecruiterRoleId()
		: await RolesService.getCandidateRoleId();

	if (role_id instanceof Error) {
		console.log(role_id);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
	}

	const newUser = new User({ email, password, role_id });
	const errors = newUser.validate();
	if (errors) {
		res.status(HttpStatus.BAD_REQUEST);
		return res.json({ errors: errors });
	}

	const exists = await UsersService.existsUser(newUser);
	if (exists instanceof Error) {
		console.log(exists);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
	}

	if (exists) {
		res.status(HttpStatus.CONFLICT);
		return res.json({ errors: { email: `an account with the email ${email} has already been registered previously` } });
	}

	const result = await UsersService.createUser(newUser);
	if (result instanceof Error) {
		console.log(result);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
	}

	res.status(HttpStatus.CREATED);
	res.send();
});

export default router;