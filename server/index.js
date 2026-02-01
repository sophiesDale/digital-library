const express = require("express");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
	res.send("Server running");
});

app.listen(3001, () => {
	console.log("Server running on port 3001");
});
