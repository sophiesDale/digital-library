const express = require("express");
const crypto = require("crypto");
const users = require("../data/users");

const router = express.Router();

router.post("/", (req, res) => {
	const { username, password, consent } = req.body;

	// 1. Basic validation
	if (!username || !password) {
		return res.status(400).json({
			error: "Username and password are required",
		});
	}

	// 2. Consent is mandatory
	if (consent !== true) {
		return res.status(400).json({
			error: "You must agree to the Terms of Service and Privacy Policy",
		});
	}

	// 3. Hash the password
	const passwordHash = crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");

	// 4. Create user object
	const user = {
		id: crypto.randomUUID(),
		username,
		passwordHash,
		consentGiven: true,
		consentedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	};

	// 5. Store user in memory
	users.push(user);

	// 6. Respond WITHOUT sensitive data
	res.status(201).json({
		id: user.id,
		username: user.username,
		createdAt: user.createdAt,
	});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const { password } = req.body;

	// 1. Password must be provided
	if (!password) {
		return res.status(400).json({
			error: "Password is required to delete account",
		});
	}

	// 2. Find user
	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		return res.status(404).json({
			error: "User not found",
		});
	}

	const user = users[userIndex];

	// 3. Hash provided password
	const passwordHash = crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");

	// 4. Compare hashes
	if (passwordHash !== user.passwordHash) {
		return res.status(403).json({
			error: "Incorrect password",
		});
	}

	// 5. Delete user (and future personal data)
	users.splice(userIndex, 1);

	res.json({
		message: "Account deleted and consent withdrawn",
	});
});

module.exports = router;
