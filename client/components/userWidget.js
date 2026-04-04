class UserWidget extends HTMLElement {
	connectedCallback() {
		this.mode = this.getAttribute("mode");
		this.render();
		this.attachEvents();
	}

	render() {
		// 🟡 CHANGE USERNAME
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

		// 🔵 CHANGE PASSWORD
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

		// 🔴 DELETE ACCOUNT
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
		// 🟡 USERNAME
		if (this.mode === "edit-username") {
			const form = this.querySelector("#username-form");

			form.addEventListener("submit", (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));

				console.log("UPDATE USERNAME:", data);
			});
		}

		// 🔵 PASSWORD
		if (this.mode === "edit-password") {
			const form = this.querySelector("#password-form");

			form.addEventListener("submit", (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));

				console.log("UPDATE PASSWORD:", data);
			});
		}

		// 🔴 DELETE
		if (this.mode === "delete") {
			const form = this.querySelector("#delete-form");

			form.addEventListener("submit", (e) => {
				e.preventDefault();

				const data = Object.fromEntries(new FormData(form));

				console.log("DELETE ACCOUNT:", data);
			});
		}
	}
}

customElements.define("user-widget", UserWidget);
