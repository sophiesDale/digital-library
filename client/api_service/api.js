const BASE_URL =
	window.location.hostname === "localhost"
		? "http://localhost:3001"
		: "https://digital-library-o2b0.onrender.com";

export async function apiFetch(endpoint, options = {}) {
	const lang =
		localStorage.getItem("lang") ||
		(navigator.language.startsWith("no") ? "no" : "en");

	const res = await fetch(BASE_URL + endpoint, {
		...options,
		headers: {
			"Content-Type": "application/json",
			"Accept-Language": lang,
			...(options.headers || {}),
		},
	});

	const data = await res.json().catch(() => ({}));

	if (!res.ok) {
		throw new Error(data.error || "Something went wrong");
	}

	return data;
}
