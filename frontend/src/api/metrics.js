const API_URL = "http://localhost:3001/api";

export async function getMetrics(token) {
  const res = await fetch(`${API_URL}/metrics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
