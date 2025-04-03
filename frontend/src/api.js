const API_URL = "http://localhost:3001/api";

export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getProdutos(token) {
  const res = await fetch(`${API_URL}/produtos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function entrada(token, name, quantity) {
  await fetch(`${API_URL}/entrada`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, quantity }),
  });
}

export async function saida(token, name, quantity) {
  await fetch(`${API_URL}/saida`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, quantity }),
  });
}
