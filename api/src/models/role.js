class Role {
	constructor(name) {
		this.name = name;
	}

	static get RECRUITER() {
		return "recruiter";
	}

	static get CANDIDATE() {
		return "candidate";
	}
}

export default Role;