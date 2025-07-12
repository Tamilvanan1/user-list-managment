const BASE = process.env.NEXT_PUBLIC_REQRES_API;
const API_KEY = process.env.NEXT_PUBLIC_REQRES_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export const loginApi = (email, password) =>
  fetch(`${BASE}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());

export const fetchUsersApi = (page) =>
  fetch(`${BASE}/users?page=${page}`).then((res) => res.json());

export const createUserApi = (data) =>
  fetch(`${BASE}/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updateUserApi = (id, data) =>
  fetch(`${BASE}/users/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deleteUserApi = (id) =>
  fetch(`${BASE}/users/${id}`, { method: "DELETE" }).then((res) => res.json());
