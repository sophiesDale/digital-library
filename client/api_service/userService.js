import { apiFetch } from "./api.js";

// 🟢 CREATE USER
export function createUser(data) {
	return apiFetch("/users", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

// 🔴 DELETE USER
export function deleteUser(userId, password) {
	return apiFetch(`/users/${userId}`, {
		method: "DELETE",
		body: JSON.stringify({ password }),
	});
}
