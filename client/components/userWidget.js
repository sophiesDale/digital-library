import { createUser, deleteUser } from "../api_service/usersService.js";

class UserWidget extends HTMLElement {
	connectedCallback() {
		this.mode = this.getAttribute("mode");
		this.render();
		this.attachEvents();
	}

	render() {
		// LOG IN
		if (this.mode === "login") {
			this.innerHTML = `
                <div class="card form-card">
                    <h1>Log In</h1>
        
                    <form id="login-form" class="form">
                        <input name="username" type="text" placeholder="Username" required />
                        <input name="password" type="password" placeholder="Password" required />
                        <button class="btn">Log In</button>
                    </form>
                </div>
            `;
		}

		// CREATE USER
		if (this.mode === "create") {
			this.innerHTML = `
				<div class="card form-card">
					<h1>Create Account</h1>

					<form id="create-form" class="form">
						<input name="username" type="text" placeholder="Username" required />
						<input name="password" type="password" placeholder="Password" required />

						<label class="checkbox">
							<input name="consent" type="checkbox" required />
							I agree to 
							<span class="link terms-link">Terms of Service & Privacy Policy</span>
						</label>

						<button class="btn">Create Account</button>
					</form>

					<!-- MODAL -->
					<div class="modal hidden" id="terms-modal">
						<div class="modal-content scrollable">

							<h2>Terms of Service</h2>

							<h3>What this service is</h3>
							<p>
								This application allows users to create and manage a personal digital library
								to keep track of the books they own.
							</p>

							<h3>Your responsibilities</h3>
							<ul>
								<li>Choosing your username</li>
								<li>Keeping your password private</li>
								<li>Using the service in a reasonable way</li>
							</ul>

							<h3>Your data</h3>
							<p>
								You own your data. By using the service, you give us permission to process your data
								only for the purpose of providing the service.
							</p>
							<p>We do not sell or share your data.</p>

							<h3>Deleting your account</h3>
							<p>
								You can delete your account whenever you want. Deleting your account permanently
								removes your user data from the system.
							</p>

							<h3>Changes to the service</h3>
							<p>
								The service may change or be discontinued in the future. There is no cost to use the service.
							</p>

							<hr />

							<h2>Privacy Policy</h2>

							<h3>What data we collect</h3>
							<ul>
								<li>A username chosen by you</li>
								<li>A password (stored as a secure hash, never plain text)</li>
								<li>A system-generated user ID</li>
								<li>Confirmation that you agreed to Terms & Privacy</li>
							</ul>

							<p>
								We do not collect real names, email addresses, or other personal details.
							</p>

							<h3>Why we collect this data</h3>
							<ul>
								<li>Identify you as a user</li>
								<li>Secure your account</li>
								<li>Let you manage your book collection</li>
							</ul>

							<h3>How your data is stored</h3>
							<p>
								All data is stored in memory on the server. Passwords are hashed and cannot be read or recovered.
							</p>

							<h3>Deleting your data</h3>
							<ul>
								<li>Your account is removed</li>
								<li>Your consent is withdrawn</li>
								<li>All personal data is deleted</li>
							</ul>

							<h3>Your rights</h3>
							<ul>
								<li>Know what data is stored</li>
								<li>Delete your account</li>
							</ul>

							<h3>Consent</h3>
							<p>
								By creating an account, you actively agree to this Privacy Policy.
								If you do not agree, no account is created.
							</p>

							<button class="btn close-modal">Close</button>
						</div>
					</div>
				</div>
			`;
		}

		// CHANGE USERNAME
		if (this.mode === "edit-username") {
			this.innerHTML = `
				<div class="card form-card">
					<h1>Change Username</h1>

					<form id="username-form" class="form">
						<input name="username" type="text" placeholder="New Username" required />
						<button class="btn">Update Username</button>
					</form>
				</div>
			`;
		}

		// CHANGE PASSWORD
		if (this.mode === "edit-password") {
			this.innerHTML = `
				<div class="card form-card">
					<h1>Change Password</h1>

					<form id="password-form" class="form">
						<input name="password" type="password" placeholder="New Password" required />
						<button class="btn">Update Password</button>
					</form>
				</div>
			`;
		}

		// DELETE ACCOUNT
		if (this.mode === "delete") {
			this.innerHTML = `
				<div class="card form-card">
					<h1>Delete Account</h1>

					<form id="delete-form" class="form">
						<input name="password" type="password" placeholder="Confirm Password" required />
						<button class="btn danger">Delete Account</button>
					</form>
				</div>
			`;
		}
	}

	attachEvents() {
		// LOG IN
		if (this.mode === "login") {
			const form = this.querySelector("#login-form");

			form.addEventListener("submit", async (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));

				try {
					const response = await fetch(
						"https://digital-library-o2b0.onrender.com/users"
					);

					const users = await response.json();

					const user = users.find(
						(u) => u.username === data.username && u.password === data.password
					);

					if (!user) {
						alert("Login failed");
						return;
					}

					localStorage.setItem("userId", user.id);
					alert("Login successful");

					window.location.href = "./homePage.html";
				} catch (err) {
					alert("Server error");
				}
			});
		}

		// CREATE USER
		if (this.mode === "create") {
			const form = this.querySelector("#create-form");
			const link = this.querySelector(".terms-link");
			const modal = this.querySelector("#terms-modal");
			const closeBtn = this.querySelector(".close-modal");

			link.addEventListener("click", () => {
				modal.classList.remove("hidden");
			});

			closeBtn.addEventListener("click", () => {
				modal.classList.add("hidden");
			});

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

					alert("User created!");

					localStorage.setItem("userId", result.id);

					window.location.href = "./homePage.html";
				} catch (err) {
					alert(err.message);
				}
			});
		}

		// DELETE USER
		if (this.mode === "delete") {
			const form = this.querySelector("#delete-form");

			form.addEventListener("submit", async (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));
				const userId = localStorage.getItem("userId");

				try {
					const response = await fetch(
						`http://localhost:3001/users/${userId}`,
						{
							method: "DELETE",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								password: data.password,
							}),
						}
					);

					const result = await response.json();

					// ❗ CHECK IF FAILED
					if (!response.ok) {
						alert(result.error || "Failed to delete account");
						return; // STOP HERE
					}

					// ✅ SUCCESS
					localStorage.removeItem("userId");
					window.location.href = "/client/views/frontPage.html";
				} catch (error) {
					console.error(error);
					alert("Server error");
				}
			});
		}
	}
}

customElements.define("user-widget", UserWidget);
