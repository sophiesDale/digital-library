import { createBook } from "../api_service/booksService.js";
import { showToast } from "../app.mjs";

export function initAddBookPage() {
	if (!window.location.pathname.includes("addBooks.html")) return;

	const form = document.querySelector("form");
	if (!form) return;

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const data = Object.fromEntries(new FormData(form));

		try {
			await createBook({
				title: data.title,
				author: data.author,
				status: data.status || "unread",
			});

			showToast("Book added!");

			setTimeout(() => {
				window.location.href = "./homePage.html";
			}, 2000);
		} catch (error) {
			alert(error.message);
		}
	});
}
