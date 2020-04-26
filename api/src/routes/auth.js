import express from "express";
import HttpStatus from "http-status-codes";
import User from "../models/user";
import UsersService from "../services/users";
import AuthService from "../services/auth";
import { AuthError, RecordNotFoundError } from "../models/error";

const router = express.Router();

router.post("/", async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(HttpStatus.BAD_REQUEST);
		return res.json({ error: AuthError.MISSING_PASSWORD_OR_EMAIL_MSG });
	}

	const user = await UsersService.getUserByEmail(email);
	if (user instanceof RecordNotFoundError) {
		res.status(HttpStatus.BAD_REQUEST);
		return res.json({ error: AuthError.PASSWORD_EMAIL_MISMATCH_MSG });
	}

	if (user instanceof Error) {
		console.log(user);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
	}

	const token = await AuthService.generateToken(new User({ ...user }), password);
	if (token instanceof AuthError) {
		res.status(HttpStatus.BAD_REQUEST);
		return res.json({ error: AuthError.PASSWORD_EMAIL_MISMATCH_MSG });
	}

	if (token instanceof Error) {
		console.log(token);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
	}

	res.json({ token });
});

export default router;