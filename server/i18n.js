const messages = {
	en: {
		userNotFound: "User not found",
		wrongPassword: "Wrong password",
		loginFailed: "Login failed",
		userExists: "Username already exists",
		bookNotFound: "Book not found",
		updateFailed: "Update failed",
		deleteFailed: "Delete failed",
		serverError: "Server error",
		success: "Success",
	},

	no: {
		userNotFound: "Bruker ikke funnet",
		wrongPassword: "Feil passord",
		loginFailed: "Innlogging feilet",
		userExists: "Brukernavn er allerede i bruk",
		bookNotFound: "Fant ikke bok",
		updateFailed: "Oppdatering feilet",
		deleteFailed: "Sletting feilet",
		serverError: "Serverfeil",
		success: "Vellykket",
	},
};

function getLang(req) {
	const header = req.headers["accept-language"];

	if (!header) return "en";

	const lang = header.toLowerCase();

	if (lang.startsWith("no") || lang.startsWith("nb") || lang.startsWith("nn")) {
		return "no";
	}

	return "en";
}

function t(lang, key) {
	return messages[lang]?.[key] || messages.en[key] || key;
}

module.exports = { getLang, t };
