const pool = require("../db");
const bcrypt = require("bcrypt");
const { t } = require("../i18n");

async function createUser(data, lang) {
	const { username, password } = data;

	if (!username || !password) {
		throw new Error(t(lang, "updateFailed"));
	}

	const existing = await pool.query("SELECT * FROM users WHERE username = $1", [
		username,
	]);

	if (existing.rows.length > 0) {
		throw new Error(t(lang, "userExists"));
	}

	const hashed = await bcrypt.hash(password, 10);

	const result = await pool.query(
		"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
		[username, hashed]
	);

	return result.rows[0];
}

async function loginUser(username, password, lang) {
	const result = await pool.query("SELECT * FROM users WHERE username = $1", [
		username,
	]);

	const user = result.rows[0];

	if (!user) {
		throw new Error(t(lang, "userNotFound"));
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new Error(t(lang, "wrongPassword"));
	}

	return user;
}

async function getUsers() {
	const result = await pool.query("SELECT * FROM users");
	return result.rows;
}

async function deleteUser(id, password, lang) {
	const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

	const user = result.rows[0];

	if (!user) {
		throw new Error(t(lang, "userNotFound"));
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new Error(t(lang, "wrongPassword"));
	}

	await pool.query("DELETE FROM users WHERE id = $1", [id]);

	return { message: "Deleted" };
}

async function updateUsername(id, username, lang) {
	const result = await pool.query(
		"UPDATE users SET username = $1 WHERE id = $2 RETURNING *",
		[username, id]
	);

	if (result.rows.length === 0) {
		throw new Error(t(lang, "userNotFound"));
	}

	return result.rows[0];
}

async function updatePassword(id, password, lang) {
	const hashed = await bcrypt.hash(password, 10);

	const result = await pool.query(
		"UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
		[hashed, id]
	);

	if (result.rows.length === 0) {
		throw new Error(t(lang, "userNotFound"));
	}

	return result.rows[0];
}

module.exports = {
	createUser,
	loginUser,
	getUsers,
	deleteUser,
	updateUsername,
	updatePassword,
};
