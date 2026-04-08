const messages = {
	en: {
		userNotFound: "User not found",
		wrongPassword: "Wrong password",
		loginFailed: "Login failed",
		userExists: "Username already exists",
		bookNotFound: "Book not found",
		updateFailed: "Update failed",
		deleteFailed: "Delete failed",
	},

	no: {
		userNotFound: "Bruker ikke funnet",
		wrongPassword: "Feil passord",
		loginFailed: "Innlogging feilet",
		userExists: "Brukernavn er allerede i bruk",
		bookNotFound: "Fant ikke bok",
		updateFailed: "Oppdatering feilet",
		deleteFailed: "Sletting feilet",
	},
};

function getLang(req) {
	const lang = req.headers["accept-language"];
	return lang && lang.startsWith("no") ? "no" : "en";
}

function t(lang, key) {
	return messages[lang]?.[key] || key;
}

module.exports = { getLang, t };
