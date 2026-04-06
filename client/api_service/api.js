const BASE_URL = "http://localhost:3001";

export async function apiFetch(endpoint, options = {}) {
	const res = await fetch(BASE_URL + endpoint, {
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	});

	// 🔥 handle errors properly (important for your exam)
	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.error || "Something went wrong");
	}

	return res.json();
}
