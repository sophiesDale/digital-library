const crypto = require("crypto");
const users = require("./users");

function createUser({ username, password, consent }) {
	if (!username || !password) {
		throw new Error("Username and password are required");
	}

	if (consent !== true) {
		throw new Error(
			"You must agree to the Terms of Service and Privacy Policy"
		);
	}

	const passwordHash = crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");

	const user = {
		id: crypto.randomUUID(),
		username,
		passwordHash,
		consentGiven: true,
		consentedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	};

	users.push(user);

	return {
		id: user.id,
		username: user.username,
		createdAt: user.createdAt,
	};
}

function deleteUser(id, password) {
	if (!password) {
		throw new Error("Password is required to delete account");
	}

	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		throw new Error("User not found");
	}

	const user = users[userIndex];

	const passwordHash = crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");

	if (passwordHash !== user.passwordHash) {
		throw new Error("Incorrect password");
	}

	users.splice(userIndex, 1);

	return { message: "Account deleted and consent withdrawn" };
}

module.exports = {
	createUser,
	deleteUser,
};
