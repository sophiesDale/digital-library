# Middleware Library

This repository contains custom Express.js middleware.

## validateBook Middleware

### Description
The validateBook middleware validates incoming request bodies for book-related
routes in an Express.js application.

It ensures that required fields are present before the request reaches
the route handler.

### Problem It Solves
Without request validation, invalid or incomplete data may reach route logic
and cause unexpected behavior.

This middleware prevents that by stopping invalid requests early and returning
a clear error response.

### How It Works
The middleware checks the request body for required fields:
- title
- author
- status

If any field is missing, the request is rejected with a 400 response.
If the request is valid, it passes control to the next middleware or route.

### Usage Example

```js
const express = require("express");
const { validateBook } = require("./src");

const app = express();
app.use(express.json());

app.post("/books", validateBook, (req, res) => {
  res.json({ message: "Book passed validation middleware" });
});
