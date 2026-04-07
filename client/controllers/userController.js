import { createUser, getUsers } from "../api_service/usersService.js";

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
				const users = await getUsers();

				const user = users.find(
					(u) => u.username === username && u.password === password
				);

				if (!user) {
					alert("Login failed");
				} else {
					localStorage.setItem("userId", user.id);
					alert("Login successful");
					window.location.href = "homePage.html";
				}
			} catch (err) {
				alert(err.message);
			}
		});
	}
}
