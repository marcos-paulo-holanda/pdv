const API_URL = "http://localhost:3001/api";

export async function getSuppliers(token) {
  const res = await fetch(`${API_URL}/suppliers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addSupplier(token, supplier) {
  const res = await fetch(`${API_URL}/suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(supplier),
  });
  return res.json();
}

export async function updateSupplier(token, id, supplier) {
  const res = await fetch(`${API_URL}/suppliers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(supplier),
  });
  return res.json();
}

export async function deleteSupplier(token, id) {
  const res = await fetch(`${API_URL}/suppliers/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
