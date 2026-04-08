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
	// translate ALL elements with data-i18n
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		const key = el.getAttribute("data-i18n");
		el.textContent = t(key);
	});

	// translate placeholders
	document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
		const key = el.getAttribute("data-i18n-placeholder");
		el.placeholder = t(key);
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
	transform: translateX(-50%) scale(0.9);
	padding: 16px 28px;
	border-radius: 999px;
	font-size: 15px;
	font-weight: 500;
	opacity: 0;
	transition: all 0.3s ease;
	z-index: 1000;
	display: flex;
	align-items: center;
	gap: 10px;

	background: linear-gradient(135deg, #4b2e2e, #6b3f3f);
	color: #f4c9d6;

	border: 2px solid rgba(244, 201, 214, 0.6);

	box-shadow:
		0 8px 25px rgba(0,0,0,0.2),
		0 0 20px rgba(244, 201, 214, 0.25);
`;
		document.body.appendChild(toast);
	}

	toast.textContent = message;
	toast.style.opacity = "1";

	setTimeout(() => {
		toast.style.opacity = "0";
	}, 1500);
}
