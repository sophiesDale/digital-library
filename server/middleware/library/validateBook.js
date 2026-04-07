function validateBook(req, res, next) {
	const { title, author, status } = req.body;

	if (!title || !author || !status) {
		return res.status(400).json({
			error: "Missing required fields: title, author, and status are required",
		});
	}

	next();
}

module.exports = validateBook;
