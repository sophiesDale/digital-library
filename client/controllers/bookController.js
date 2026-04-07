import { apiFetch } from "../api_service/api.js";
import { getBooks } from "../api_service/booksService.js";

export function initBookPage() {
	if (!window.location.pathname.includes("homePage.html")) return;

	const list = document.querySelector(".book-list");
	if (!list) return;

	loadBooks(list);
}

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

			deleteBtn.addEventListener("click", () => {
				div.innerHTML = `
		  <span>Delete "${book.title}"?</span>
		  <div>
			<button class="btn small danger confirm-delete">Delete</button>
			<button class="btn small cancel-delete">Cancel</button>
		  </div>
		`;

				const confirmBtn = div.querySelector(".confirm-delete");
				const cancelBtn = div.querySelector(".cancel-delete");

				confirmBtn.addEventListener("click", async () => {
					await apiFetch(`/books/${book.id}`, {
						method: "DELETE",
					});

					div.remove();
				});

				cancelBtn.addEventListener("click", () => {
					loadBooks(container); // reload original UI
				});
			});

			const editBtn = div.querySelector(".edit-btn");

			editBtn.addEventListener("click", () => {
				div.innerHTML = `
    <input class="edit-title" value="${book.title}" />
    <input class="edit-author" value="${book.author}" />
    
    <select class="edit-status">
      <option value="unread" ${
				book.status === "unread" ? "selected" : ""
			}>Unread</option>
      <option value="reading" ${
				book.status === "reading" ? "selected" : ""
			}>Reading</option>
      <option value="finished" ${
				book.status === "finished" ? "selected" : ""
			}>Finished</option>
    </select>

    <div>
      <button class="btn small save-btn">Save</button>
      <button class="btn small cancel-btn">Cancel</button>
    </div>
  `;

				const saveBtn = div.querySelector(".save-btn");
				const cancelBtn = div.querySelector(".cancel-btn");

				saveBtn.addEventListener("click", async () => {
					const newTitle = div.querySelector(".edit-title").value;
					const newAuthor = div.querySelector(".edit-author").value;
					const newStatus = div.querySelector(".edit-status").value;

					const updated = await apiFetch(`/books/${book.id}`, {
						method: "PUT",
						body: JSON.stringify({
							title: newTitle,
							author: newAuthor,
							status: newStatus,
						}),
					});

					// re-render
					loadBooks(container);
				});

				cancelBtn.addEventListener("click", () => {
					loadBooks(container);
				});
			});
			container.appendChild(div);
		});
	} catch (error) {
		console.error(error);
	}
}
