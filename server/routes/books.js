const express = require("express");
const router = express.Router();
const { validateBook } = require("../middleware/library");

// GET /books
router.get("/", (req, res) => {
	res.json({ message: "Get all books (not implemented)" });
});

// POST /books
router.post("/books", validateBook, (req, res) => {
	res.json({ message: "Book passed validation middleware" });
});

// GET /books/:id
router.get("/books/:id", (req, res) => {
	res.json({
		message: "Get book by id (not implemented)",
		id: req.params.id,
	});
});

// PUT /books/:id
router.put("/books/:id", (req, res) => {
	res.json({
		message: "Update book (not implemented)",
		id: req.params.id,
	});
});

// DELETE /books/:id
router.delete("/books/:id", (req, res) => {
	res.json({
		message: "Delete book (not implemented)",
		id: req.params.id,
	});
});

// PATCH /books/:id/status
router.patch("/books/:id/status", (req, res) => {
	const { status } = req.body;

	res.json({
		message: "Update reading status (not implemented)",
		id: req.params.id,
		status,
	});
});

module.exports = router;
