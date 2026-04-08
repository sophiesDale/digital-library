const express = require("express");
const {
	createUser,
	loginUser,
	deleteUser,
	getUsers,
	updateUsername,
	updatePassword,
} = require("../data/usersService");
const { getLang } = require("../i18n");

const router = express.Router();

router.post("/", async (req, res) => {
	const lang = getLang(req);
	try {
		const user = await createUser(req.body, lang);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/login", async (req, res) => {
	const lang = getLang(req);
	try {
		const { username, password } = req.body;
		const user = await loginUser(username, password, lang);
		res.json(user);
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const users = await getUsers();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	const lang = getLang(req);
	try {
		const result = await deleteUser(req.params.id, req.body.password, lang);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put("/:id/username", async (req, res) => {
	const lang = getLang(req);
	try {
		const user = await updateUsername(req.params.id, req.body.username, lang);
		res.json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.put("/:id/password", async (req, res) => {
	const lang = getLang(req);
	try {
		const user = await updatePassword(req.params.id, req.body.password, lang);
		res.json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
