async function loadBooks(container) {
	try {
		const userId = localStorage.getItem("userId");
		const books = await getBooks(userId);

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
				await apiFetch(`/books/${book.id}`, {
					method: "DELETE",
				});

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

				await apiFetch(`/books/${book.id}`, {
					method: "PUT",
					body: JSON.stringify({
						title: newTitle,
						author: newAuthor,
						status: newStatus,
					}),
				});

				loadBooks(container);
			});

			container.appendChild(div);
		});
	} catch (error) {
		console.error(error);
	}
}
