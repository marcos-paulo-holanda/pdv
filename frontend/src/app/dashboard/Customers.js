import { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../api";

function Customers({ token }) {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", document: "", phone: "", email: "", address: "" });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("");

  const loadCustomers = async () => {
    const data = await getCustomers(token);
    setCustomers(data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCustomer(token, editingId, form);
      setEditingId(null);
    } else {
      await addCustomer(token, form);
    }

    setForm({ name: "", document: "", phone: "", email: "", address: "" });
    loadCustomers();
  };

  const handleEdit = (c) => {
    setForm(c);
    setEditingId(c.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja excluir este cliente?")) {
      await deleteCustomer(token, id);
      loadCustomers();
    }
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.document.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Clientes</h2>

      <input
        placeholder="Pesquisar por nome ou CPF/CNPJ..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Documento</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.document}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>{" "}
                <button onClick={() => handleDelete(c.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editingId ? "Editar Cliente" : "Adicionar Cliente"}</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="CPF/CNPJ" value={form.document} onChange={(e) => setForm({ ...form, document: e.target.value })} />
        <input placeholder="Telefone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Endereço" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <button type="submit">{editingId ? "Salvar alterações" : "Adicionar"}</button>
      </form>
    </div>
  );
}

export default Customers;
