const API_URL = "http://localhost:3001/api";

export async function getCustomers(token) {
  const res = await fetch(`${API_URL}/customers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function addCustomer(token, customer) {
  const res = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });
  return res.json();
}

export async function updateCustomer(token, id, customer) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });
  return res.json();
}

export async function deleteCustomer(token, id) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
