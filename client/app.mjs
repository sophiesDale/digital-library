export async function apiFetch(url, options = {}) {
	const response = await fetch(url, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	return response.json();
}

//----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
	const logoutButtons = document.querySelectorAll(".logout");

	logoutButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			console.log("Logout clicked");

			localStorage.removeItem("userId");

			window.location.href = "/client/views/frontPage.html";
		});
	});
});

//----------------------------------------------------------------------------

import { createBook } from "./api_service/booksService.js";

document.addEventListener("DOMContentLoaded", () => {
	if (window.location.pathname.includes("addBooks.html")) {
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

				alert("Book added!");

				window.location.href = "./homePage.html";
			} catch (error) {
				alert(error.message);
			}
		});
	}
});

//----------------------------------------------------------------------

import { getBooks } from "./api_service/booksService.js";

document.addEventListener("DOMContentLoaded", () => {
	if (window.location.pathname.includes("homePage.html")) {
		const list = document.querySelector(".book-list");

		if (!list) return;

		loadBooks(list);
	}
});

async function loadBooks(container) {
	try {
		const books = await getBooks();

		container.innerHTML = "";

		if (books.length === 0) {
			container.innerHTML = "<p>No books yet</p>";
			return;
		}

		books.forEach((book, index) => {
			const div = document.createElement("div");
			div.className = "book-item";

			div.innerHTML = `
        <span>${index + 1}. ${book.title} - ${book.author}</span>
        <div>
          <button class="btn small">Edit</button>
          <button class="btn small danger">Delete</button>
        </div>
      `;

			container.appendChild(div);
		});
	} catch (error) {
		console.error("Failed to load books:", error);
	}
}
