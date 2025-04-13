const API_URL = "http://localhost:3001/api";

export async function registerSale(token, items, total, payment_method) {
  const res = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ items, total, payment_method })
  });
  return res.json();
}

export async function getTodaySales(token) {
  const res = await fetch(`${API_URL}/sales/today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
