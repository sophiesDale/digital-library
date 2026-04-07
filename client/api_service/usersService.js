import { apiFetch } from "./api.js";

export function createUser(data) {
	return apiFetch("/users", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export function getUsers() {
	return apiFetch("/users");
}

export function deleteUser(userId, password) {
	return apiFetch(`/users/${userId}`, {
		method: "DELETE",
		body: JSON.stringify({ password }),
	});
}
