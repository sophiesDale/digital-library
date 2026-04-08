const express = require("express");
const router = express.Router();

const {
	createBook,
	getBooks,
	deleteBook,
	updateBook,
} = require("../data/booksService");

// GET all books (for user)
router.get("/", async (req, res) => {
	try {
		const userId = req.query.userId;

		const books = await getBooks(userId);

		res.json(books);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// CREATE book
router.post("/", async (req, res) => {
	try {
		const { title, author, status, userId } = req.body;

		const book = await createBook({
			title,
			author,
			status,
			userId,
		});

		res.status(201).json(book);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// UPDATE
router.put("/:id", async (req, res) => {
	try {
		const updated = await updateBook(req.params.id, req.body);
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// DELETE
router.delete("/:id", async (req, res) => {
	try {
		await deleteBook(req.params.id);
		res.json({ message: "Deleted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
