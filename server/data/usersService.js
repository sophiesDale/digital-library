const pool = require("../db");

// Create user
async function createUser(data) {
	const { username, password } = data;

	if (!username || !password) {
		throw new Error("Username and password required");
	}

	const result = await pool.query(
		"INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
		[username, password]
	);

	return result.rows[0];
}

// Get all users
async function getUsers() {
	const result = await pool.query("SELECT * FROM users");
	return result.rows;
}

// Delete user
async function deleteUser(id, password) {
	const result = await pool.query(
		"DELETE FROM users WHERE id = $1 AND password = $2 RETURNING *",
		[id, password]
	);

	if (result.rows.length === 0) {
		throw new Error("User not found or wrong password");
	}

	return { message: "User deleted" };
}

module.exports = {
	createUser,
	getUsers,
	deleteUser,
};
