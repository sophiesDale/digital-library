const express = require("express");
const router = express.Router();
const books = require("../data/books");
const crypto = require("crypto");
const { validateBook } = require("../middleware/library");

// GET /books (get all books)
router.get("/", (req, res) => {
	res.json(books);
});

// POST /books (create book)
router.post("/", validateBook, (req, res) => {
	const { title, author, status } = req.body;

	const newBook = {
		id: crypto.randomUUID(),
		title,
		author,
		status,
	};

	books.push(newBook);

	res.status(201).json(newBook);
});

// GET /books/:id (get single book)
router.get("/:id", (req, res) => {
	const book = books.find((b) => b.id === req.params.id);

	if (!book) {
		return res.status(404).json({ error: "Book not found" });
	}

	res.json(book);
});

// PUT /books/:id (update entire book)
router.put("/:id", (req, res) => {
	const index = books.findIndex((b) => b.id === req.params.id);

	if (index === -1) {
		return res.status(404).json({ error: "Book not found" });
	}

	const { title, author, status } = req.body;

	books[index] = {
		id: books[index].id,
		title,
		author,
		status,
	};

	res.json(books[index]);
});

// DELETE /books/:id
router.delete("/:id", (req, res) => {
	const index = books.findIndex((b) => b.id === req.params.id);

	if (index === -1) {
		return res.status(404).json({ error: "Book not found" });
	}

	books.splice(index, 1);

	res.json({ message: "Book deleted" });
});

// PATCH /books/:id/status (update only status)
router.patch("/:id/status", (req, res) => {
	const book = books.find((b) => b.id === req.params.id);

	if (!book) {
		return res.status(404).json({ error: "Book not found" });
	}

	const { status } = req.body;

	book.status = status;

	res.json(book);
});

module.exports = router;
