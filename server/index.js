const express = require("express");
const bookRoutes = require("./routes/books");

const app = express();
app.use(express.json());
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
	res.send("Server running");
});

app.listen(3001, () => {
	console.log("Server running on port 3001");
});
