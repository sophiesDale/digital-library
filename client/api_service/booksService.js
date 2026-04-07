import { apiFetch } from "./api.js";

export async function createBook(book) {
	return await apiFetch("/books", {
		method: "POST",
		body: JSON.stringify(book),
	});
}

export async function getBooks() {
	return await apiFetch("/books");
}
