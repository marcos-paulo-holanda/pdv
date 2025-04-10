import { useEffect, useState } from "react";
import {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../api";

function Suppliers({ token }) {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: "", document: "", phone: "", email: "", address: "" });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("");

  const loadSuppliers = async () => {
    const data = await getSuppliers(token);
    setSuppliers(data);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateSupplier(token, editingId, form);
      setEditingId(null);
    } else {
      await addSupplier(token, form);
    }

    setForm({ name: "", document: "", phone: "", email: "", address: "" });
    loadSuppliers();
  };

  const handleEdit = (s) => {
    setForm(s);
    setEditingId(s.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja excluir este fornecedor?")) {
      await deleteSupplier(token, id);
      loadSuppliers();
    }
  };

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.document.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Fornecedores</h2>

      <input
        placeholder="Pesquisar por nome ou CNPJ..."
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
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.document}</td>
              <td>{s.phone}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Editar</button>{" "}
                <button onClick={() => handleDelete(s.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editingId ? "Editar Fornecedor" : "Adicionar Fornecedor"}</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="CNPJ" value={form.document} onChange={(e) => setForm({ ...form, document: e.target.value })} />
        <input placeholder="Telefone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Endereço" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <button type="submit">{editingId ? "Salvar alterações" : "Adicionar"}</button>
      </form>
    </div>
  );
}

export default Suppliers;
