const express = require("express");
const router = express.Router();

// GET /books
router.get("/", (req, res) => {
	res.json({ message: "Get all books (not implemented)" });
});

// POST /books
router.post("/", (req, res) => {
	res.json({ message: "Create a new book (not implemented)" });
});

// GET /books/:id
router.get("/:id", (req, res) => {
	res.json({
		message: "Get book by id (not implemented)",
		id: req.params.id,
	});
});

// PUT /books/:id
router.put("/:id", (req, res) => {
	res.json({
		message: "Update book (not implemented)",
		id: req.params.id,
	});
});

// DELETE /books/:id
router.delete("/:id", (req, res) => {
	res.json({
		message: "Delete book (not implemented)",
		id: req.params.id,
	});
});

// PATCH /books/:id/status
router.patch("/:id/status", (req, res) => {
	const { status } = req.body;

	res.json({
		message: "Update reading status (not implemented)",
		id: req.params.id,
		status,
	});
});

module.exports = router;
