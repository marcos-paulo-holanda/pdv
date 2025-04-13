const API_URL = "http://localhost:3001/api";

export async function getProducts(token) {
  const res = await fetch(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addProduct(token, product) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(token, id, product) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(token, id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
