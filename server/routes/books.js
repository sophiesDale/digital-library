const express = require("express");
const router = express.Router();

const {
	createBook,
	getBooks,
	deleteBook,
	updateBook,
} = require("../data/booksService");
const { getLang } = require("../i18n");

router.get("/", async (req, res) => {
	try {
		const userId = req.query.userId;
		const books = await getBooks(userId);
		res.json(books);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const book = await createBook(req.body);
		res.status(201).json(book);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.put("/:id", async (req, res) => {
	const lang = getLang(req);
	try {
		const updated = await updateBook(req.params.id, req.body, lang);
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.delete("/:id", async (req, res) => {
	const lang = getLang(req);
	try {
		await deleteBook(req.params.id, lang);
		res.json({ message: "Deleted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
