require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
	res.send("Server running");
});

async function createTable() {
	try {
		await pool.query(`
			CREATE TABLE IF NOT EXISTS users (
				id SERIAL PRIMARY KEY,
				username TEXT,
				password TEXT
			);
		`);
		console.log("Users table ready");
	} catch (err) {
		console.error("Error creating table:", err);
	}
}

createTable();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log("Server running on port", PORT);
});
