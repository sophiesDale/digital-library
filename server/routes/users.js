const express = require("express");
const { createUser, deleteUser } = require("../data/usersService");

const router = express.Router();

router.post("/", (req, res) => {
	try {
		const user = createUser(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:id", (req, res) => {
	try {
		const result = deleteUser(req.params.id, req.body.password);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
