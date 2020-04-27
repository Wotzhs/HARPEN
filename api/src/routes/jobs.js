import express from "express";
import HttpStatus from "http-status-codes";
import Job from "../models/job";
import UsersService from "../services/users";
import AuthService from "../services/auth";
import JobService from "../services/jobs";
import { RecordNotFoundError } from "../models/error";

const router = express.Router();

router.use((req, res, next) => {
	req.token_decrypted = AuthService.verifyToken(req.cookies.token);
	next();
});

router.get("/", async (req, res, next) => {
	const { offset, limit, email } = req.query;
	// get own jobs
	if ((email && !req.token_decrypted) || (req.token_decrypted && email !== req.token_decrypted.email)) {
		res.status(HttpStatus.UNAUTHORIZED);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
	}

	const result = email
		? await JobService.getOwnJobList({ offset, limit, user_id: req.token_decrypted.user_id })
		: await JobService.getJobList({ offset, limit });

	if (result instanceof Error) {
		console.log(result);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR ) });
	}
	res.json(result);
});

router.get("/:slug", async (req, res, next) =>{
	const result = await JobService.getJobBySlug({
		slug: req.params.slug,
		role_name: req.token_decrypted && req.token_decrypted.role_name
	});
	if (result instanceof RecordNotFoundError) {
		res.status(HttpStatus.NOT_FOUND);
		return res.json({ error: result.message });
	}

	if (result instanceof Error) {
		console.log(result);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
	}

	res.json(result);
});

router.post("/", async (req, res, next) => {
	if (!req.token_decrypted || !req.token_decrypted.user_id) {
		res.status(HttpStatus.UNAUTHORIZED);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
	}

	const newJob = new Job({ ...req.body, user_id: req.token_decrypted.user_id });
	const errors = newJob.validate();
	if (errors) {
		res.status(HttpStatus.BAD_REQUEST);
		return res.json({ errors });
	}

	const newJobId = await JobService.createJob(newJob);
	if (newJobId instanceof Error) {
		console.log(newJobId);
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) });
	}

	res.status(HttpStatus.CREATED);
	res.json({ id: newJobId });
});

router.put("/", async (req, res, next) => {
	if (!req.token_decrypted.user_id) {
		res.status(HttpStatus.UNAUTHORIZED);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
	}

	res.json();
});

router.delete("/", async (req, res, next) => {
	if (!req.token_decrypted.user_id) {
		res.status(HttpStatus.UNAUTHORIZED);
		return res.json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
	}

	res.json();
});

export default router;