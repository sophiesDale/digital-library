import { initBookPage } from "./controllers/bookController.js";
import { initAddBookPage } from "./controllers/addBookController.js";
import { initUserPage } from "./controllers/userController.js";

document.addEventListener("DOMContentLoaded", () => {
	initBookPage();
	initAddBookPage();
	initUserPage();

	const logoutButtons = document.querySelectorAll(".logout");

	logoutButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			localStorage.removeItem("userId");

			// ✅ FIXED PATH
			window.location.href = "/";
		});
	});
});

export function showToast(message, type = "success") {
	let toast = document.getElementById("toast");

	if (!toast) {
		toast = document.createElement("div");
		toast.id = "toast";
		toast.style.cssText = `
			position: fixed;
			top: 40px;
			left: 50%;
			transform: translateX(-50%) scale(0.9);
			padding: 16px 26px;
			border-radius: 999px;
			font-size: 16px;
			font-weight: 500;
			opacity: 0;
			transition: all 0.25s ease;
			z-index: 1000;
			box-shadow: 0 8px 25px rgba(0,0,0,0.15);
			display: flex;
			align-items: center;
			gap: 10px;
			background: var(--espresso);
			color: var(--peony);
			border: 2px solid rgba(244, 201, 214, 0.6);
		`;
		document.body.appendChild(toast);
	}

	const styles = {
		success: { icon: "💗" },
		error: { icon: "💔" },
		warning: { icon: "⚠️" },
		info: { icon: "✨" },
	};

	const selected = styles[type] || styles.success;

	toast.innerHTML = `<span>${selected.icon}</span><span>${message}</span>`;

	requestAnimationFrame(() => {
		toast.style.opacity = "1";
		toast.style.transform = "translateX(-50%) scale(1)";
	});

	setTimeout(() => {
		toast.style.opacity = "0";
		toast.style.transform = "translateX(-50%) scale(0.9)";
	}, 1500);
}
