const pool = require("../db");

// CREATE
async function createBook({ title, author, status, userId }) {
	const result = await pool.query(
		"INSERT INTO books (title, author, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
		[title, author, status, userId]
	);

	return result.rows[0];
}

// GET (by user)
async function getBooks(userId) {
	const result = await pool.query(
		"SELECT * FROM books WHERE user_id = $1 ORDER BY id",
		[userId]
	);

	return result.rows;
}

// DELETE
async function deleteBook(id) {
	await pool.query("DELETE FROM books WHERE id = $1", [id]);
}

// UPDATE
async function updateBook(id, { title, author, status }) {
	const result = await pool.query(
		"UPDATE books SET title=$1, author=$2, status=$3 WHERE id=$4 RETURNING *",
		[title, author, status, id]
	);

	return result.rows[0];
}

module.exports = {
	createBook,
	getBooks,
	deleteBook,
	updateBook,
};
