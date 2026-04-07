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
			console.log("Logout clicked"); // 👈 debug

			localStorage.removeItem("userId");

			window.location.href = "/client/views/frontPage.html";
		});
	});
});
