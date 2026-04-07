const pool = require("../db");
const bcrypt = require("bcrypt");

// CREATE USER (HASH PASSWORD)
async function createUser(data) {
	const { username, password } = data;

	if (!username || !password) {
		throw new Error("Username and password required");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const result = await pool.query(
		"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
		[username, hashedPassword]
	);

	return result.rows[0];
}

// LOGIN USER
async function loginUser(username, password) {
	const result = await pool.query("SELECT * FROM users WHERE username = $1", [
		username,
	]);

	const user = result.rows[0];

	if (!user) {
		throw new Error("Invalid credentials");
	}

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) {
		throw new Error("Invalid credentials");
	}

	return { id: user.id, username: user.username };
}

// GET USERS (optional, but fine for now)
async function getUsers() {
	const result = await pool.query("SELECT id, username FROM users");
	return result.rows;
}

// DELETE USER (SECURE VERSION)
async function deleteUser(id, password) {
	const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

	const user = result.rows[0];

	if (!user) {
		throw new Error("User not found");
	}

	const validPassword = await bcrypt.compare(password, user.password);

	if (!validPassword) {
		throw new Error("Wrong password");
	}

	await pool.query("DELETE FROM users WHERE id = $1", [id]);

	return { message: "User deleted" };
}

module.exports = {
	createUser,
	loginUser,
	getUsers,
	deleteUser,
};
