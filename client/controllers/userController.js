import { createUser } from "../api_service/usersService.js";

export function initUserPage() {
	const createForm = document.getElementById("createUserForm");
	const loginForm = document.getElementById("loginForm");

	if (createForm) {
		createForm.addEventListener("submit", async (event) => {
			event.preventDefault();

			const username = document.querySelector("#username").value;
			const password = document.querySelector("#password").value;

			try {
				await createUser({ username, password });
				alert("User created");
			} catch (err) {
				alert(err.message);
			}
		});
	}

	if (loginForm) {
		loginForm.addEventListener("submit", async (event) => {
			event.preventDefault();

			const username = document.querySelector("#username").value;
			const password = document.querySelector("#password").value;

			try {
				const response = await fetch("/users/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				});

				const result = await response.json();

				if (!response.ok) {
					alert(result.error || "Login failed");
					return;
				}

				localStorage.setItem("userId", result.id);
				alert("Login successful");

				window.location.href = "/homePage.html";
			} catch (err) {
				alert("Server error");
			}
		});
	}
}
