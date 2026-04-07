require("dotenv").config();

const express = require("express");
const cors = require("cors");

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log("Server running on port", PORT);
});
