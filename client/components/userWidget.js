import { createUser } from "../api_service/usersService.js";
import { showToast, t } from "../app.mjs";

class UserWidget extends HTMLElement {
	connectedCallback() {
		this.mode = this.getAttribute("mode");
		this.render();
		this.attachEvents();
	}

	render() {
		if (this.mode === "login") {
			this.innerHTML = `
				<div class="card form-card">
					<h1 data-i18n="login"></h1>
					<form id="login-form" class="form">
						<input name="username" data-i18n-placeholder="username" required />
						<input name="password" type="password" data-i18n-placeholder="password" required />
						<button class="btn" data-i18n="login"></button>
					</form>
				</div>
			`;
		}

		if (this.mode === "create") {
			this.innerHTML = `
				<div class="card form-card">
					<h1 data-i18n="createAccount"></h1>

					<form id="create-form" class="form">
						<input name="username" data-i18n-placeholder="username" required />
						<input name="password" type="password" data-i18n-placeholder="password" required />

						<label class="checkbox">
							<input name="consent" type="checkbox" required />
							I agree
						</label>

						<button class="btn" data-i18n="createAccount"></button>
					</form>
				</div>
			`;
		}

		if (this.mode === "edit-username") {
			this.innerHTML = `
				<div class="card form-card">
					<h1 data-i18n="changeUsername"></h1>

					<form id="username-form" class="form">
						<input name="username" data-i18n-placeholder="username" required />
						<button class="btn" data-i18n="save"></button>
					</form>
				</div>
			`;
		}

		if (this.mode === "edit-password") {
			this.innerHTML = `
				<div class="card form-card">
					<h1 data-i18n="changePassword"></h1>

					<form id="password-form" class="form">
						<input name="password" type="password" data-i18n-placeholder="password" required />
						<button class="btn" data-i18n="save"></button>
					</form>
				</div>
			`;
		}

		if (this.mode === "delete") {
			this.innerHTML = `
				<div class="card form-card">
					<h1 data-i18n="deleteAccount"></h1>

					<form id="delete-form" class="form">
						<input name="password" type="password" data-i18n-placeholder="password" required />
						<button class="btn danger" data-i18n="deleteAccount"></button>
					</form>
				</div>
			`;
		}
	}

	attachEvents() {
		// LOGIN
		if (this.mode === "login") {
			const form = this.querySelector("#login-form");

			form.addEventListener("submit", async (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));

				try {
					const response = await fetch("/users/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(data),
					});

					const result = await response.json();

					if (!response.ok) {
						showToast(t("loginFailed"), "error");
						return;
					}

					localStorage.setItem("userId", result.id);
					showToast(t("loginSuccess"));

					setTimeout(() => {
						window.location.href = "/homePage.html";
					}, 1200);
				} catch {
					showToast(t("serverError"), "error");
				}
			});
		}

		// CREATE USER
		if (this.mode === "create") {
			const form = this.querySelector("#create-form");

			form.addEventListener("submit", async (e) => {
				e.preventDefault();

				const formData = new FormData(form);

				const data = {
					username: formData.get("username"),
					password: formData.get("password"),
					consent: formData.get("consent") === "on",
				};

				try {
					const result = await createUser(data);

					localStorage.setItem("userId", result.id);
					showToast(t("userCreated"));

					setTimeout(() => {
						window.location.href = "/homePage.html";
					}, 1200);
				} catch {
					showToast(t("serverError"), "error");
				}
			});
		}

		// DELETE
		if (this.mode === "delete") {
			const form = this.querySelector("#delete-form");

			form.addEventListener("submit", async (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));
				const userId = localStorage.getItem("userId");

				try {
					const response = await fetch(`/users/${userId}`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(data),
					});

					if (!response.ok) {
						showToast(t("deleteFailed"), "error");
						return;
					}

					localStorage.removeItem("userId");
					showToast(t("accountDeleted"));

					setTimeout(() => {
						window.location.href = "/";
					}, 1200);
				} catch {
					showToast(t("serverError"), "error");
				}
			});
		}

		// UPDATE USERNAME
		if (this.mode === "edit-username") {
			const form = this.querySelector("#username-form");

			form.addEventListener("submit", async (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));
				const userId = localStorage.getItem("userId");

				const response = await fetch(`/users/${userId}/username`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				if (!response.ok) {
					showToast(t("updateFailed"), "error");
					return;
				}

				showToast(t("usernameUpdated"));
			});
		}

		// UPDATE PASSWORD
		if (this.mode === "edit-password") {
			const form = this.querySelector("#password-form");

			form.addEventListener("submit", async (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));
				const userId = localStorage.getItem("userId");

				const response = await fetch(`/users/${userId}/password`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				if (!response.ok) {
					showToast(t("updateFailed"), "error");
					return;
				}

				showToast(t("passwordUpdated"));
			});
		}
	}
}

customElements.define("user-widget", UserWidget);
