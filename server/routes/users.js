const express = require("express");
const {
	createUser,
	loginUser,
	deleteUser,
	getUsers,
} = require("../data/usersService");

const router = express.Router();

// CREATE user
router.post("/", async (req, res) => {
	try {
		const user = await createUser(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// LOGIN user
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await loginUser(username, password);

		res.json(user);
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
});

// GET all users
router.get("/", async (req, res) => {
	try {
		const users = await getUsers();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// DELETE user
router.delete("/:id", async (req, res) => {
	try {
		const result = await deleteUser(req.params.id, req.body.password);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
