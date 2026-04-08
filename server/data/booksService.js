const pool = require("../db");
const { t } = require("../i18n");

async function createBook(data) {
	const { title, author, status, userId } = data;

	const result = await pool.query(
		"INSERT INTO books (title, author, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
		[title, author, status, userId]
	);

	return result.rows[0];
}

async function getBooks(userId) {
	const result = await pool.query(
		"SELECT * FROM books WHERE user_id = $1 ORDER BY id",
		[userId]
	);

	return result.rows;
}

async function deleteBook(id, lang) {
	const result = await pool.query(
		"DELETE FROM books WHERE id = $1 RETURNING *",
		[id]
	);

	if (result.rows.length === 0) {
		throw new Error(t(lang, "bookNotFound"));
	}
}

async function updateBook(id, data, lang) {
	const { title, author, status } = data;

	const result = await pool.query(
		"UPDATE books SET title=$1, author=$2, status=$3 WHERE id=$4 RETURNING *",
		[title, author, status, id]
	);

	if (result.rows.length === 0) {
		throw new Error(t(lang, "bookNotFound"));
	}

	return result.rows[0];
}

module.exports = {
	createBook,
	getBooks,
	deleteBook,
	updateBook,
};
