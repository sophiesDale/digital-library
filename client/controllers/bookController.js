import { apiFetch } from "../api_service/api.js";
import { getBooks } from "../api_service/booksService.js";

export function initBookPage() {
	if (!window.location.pathname.includes("homePage.html")) return;

	const list = document.querySelector(".book-list");
	if (!list) return;

	loadBooks(list);
}

async function loadBooks(container) {
	let books = [];

	try {
		const userId = localStorage.getItem("userId");

		books = await getBooks(userId);

		localStorage.setItem("books", JSON.stringify(books));
	} catch (error) {
		console.warn("Offline mode: loading cached books");

		books = JSON.parse(localStorage.getItem("books")) || [];
	}

	container.innerHTML = "";

	if (books.length === 0) {
		container.innerHTML = "<p>No books yet</p>";
		return;
	}

	books.forEach((book, index) => {
		const div = document.createElement("div");
		div.className = "book-item";

		div.innerHTML = `
			<span>
				${index + 1}. ${book.title} - ${book.author}
				<em>(${book.status})</em>
			</span>
			<div>
				<button class="btn small edit-btn">Edit</button>
				<button class="btn small danger delete-btn">Delete</button>
			</div>
		`;

		const deleteBtn = div.querySelector(".delete-btn");

		deleteBtn.addEventListener("click", async () => {
			try {
				await apiFetch(`/books/${book.id}`, {
					method: "DELETE",
				});
			} catch {
				console.warn("Offline: delete will sync later");
			}

			loadBooks(container);
		});

		const editBtn = div.querySelector(".edit-btn");

		editBtn.addEventListener("click", async () => {
			const newTitle = prompt("New title:", book.title);
			const newAuthor = prompt("New author:", book.author);
			const newStatus = prompt(
				"Status (unread/reading/finished):",
				book.status
			);

			try {
				await apiFetch(`/books/${book.id}`, {
					method: "PUT",
					body: JSON.stringify({
						title: newTitle,
						author: newAuthor,
						status: newStatus,
					}),
				});
			} catch {
				console.warn("Offline: edit will sync later");
			}

			loadBooks(container);
		});

		container.appendChild(div);
	});
}
