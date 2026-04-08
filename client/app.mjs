import { initBookPage } from "./controllers/bookController.js";
import { initAddBookPage } from "./controllers/addBookController.js";
import { initUserPage } from "./controllers/userController.js";
import { translations } from "./i18n.js";

export function getLang() {
	return (
		localStorage.getItem("lang") ||
		(navigator.language.startsWith("no") ? "no" : "en")
	);
}

export function t(key) {
	const lang = getLang();
	return translations[lang][key] || key;
}

document.addEventListener("DOMContentLoaded", () => {
	initBookPage();
	initAddBookPage();
	initUserPage();

	const switcher = document.getElementById("lang-switch");
	if (switcher) {
		switcher.value = getLang();
		switcher.addEventListener("change", () => {
			localStorage.setItem("lang", switcher.value);
			location.reload();
		});
	}

	document.querySelectorAll(".logout").forEach((btn) => {
		btn.textContent = t("logout");
		btn.addEventListener("click", () => {
			localStorage.removeItem("userId");
			window.location.href = "/";
		});
	});

	const map = {
		".title": "title",
		".login-text": "login",
		".create-text": "createAccount",
		".add-book-text": "addBook",
	};

	Object.entries(map).forEach(([selector, key]) => {
		document.querySelectorAll(selector).forEach((el) => {
			el.textContent = t(key);
		});
	});
});

export function showToast(message) {
	let toast = document.getElementById("toast");

	if (!toast) {
		toast = document.createElement("div");
		toast.id = "toast";
		toast.style.cssText = `
			position: fixed;
			top: 40px;
			left: 50%;
			transform: translateX(-50%);
			padding: 12px 20px;
			border-radius: 999px;
			opacity: 0;
			transition: 0.2s;
			background: black;
			color: white;
			z-index: 1000;
		`;
		document.body.appendChild(toast);
	}

	toast.textContent = message;
	toast.style.opacity = "1";

	setTimeout(() => {
		toast.style.opacity = "0";
	}, 1500);
}
