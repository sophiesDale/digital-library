require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");

const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "../client")));

// API ROUTES
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

// FRONT PAGE
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/frontPage.html"));
});

// CLEAN ROUTES
app.get("/loginPage.html", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/loginPage.html"));
});

app.get("/createUser.html", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/createUser.html"));
});

app.get("/homePage.html", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/homePage.html"));
});

app.get("/userPage.html", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/userPage.html"));
});

app.get("/addBooks.html", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/addBooks.html"));
});

// EDIT USER
app.get("/editUser/editUserName.html", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../client/views/editUser/editUserName.html")
	);
});

app.get("/editUser/editPassword.html", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../client/views/editUser/editPassword.html")
	);
});

app.get("/editUser/deleteAccount.html", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../client/views/editUser/deleteAccount.html")
	);
});

// DB INIT
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
