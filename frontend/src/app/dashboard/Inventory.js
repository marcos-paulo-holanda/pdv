import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api";

function Inventory({ token }) {
  console.log("Inventory carregado!");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", sku: "", price: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("");

  const loadProducts = async () => {
    const data = await getProducts(token);
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity)
    };

    if (editingId) {
      await updateProduct(token, editingId, data);
      setEditingId(null);
    } else {
      await addProduct(token, data);
    }

    setForm({ name: "", sku: "", price: "", quantity: "" });
    loadProducts();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja excluir este produto?")) {
      await deleteProduct(token, id);
      loadProducts();
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Estoque</h2>

      <input
        placeholder="Pesquisar produto..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />

      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>SKU</th>
            <th>Preço</th>
            <th>Qtd</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} style={{ backgroundColor: p.quantity < 5 ? "#ffe5e5" : "white" }}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>R$ {p.price.toFixed(2)}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>{" "}
                <button onClick={() => handleDelete(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editingId ? "Editar Produto" : "Adicionar Produto"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <input
          placeholder="Preço"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Quantidade"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <button type="submit">
          {editingId ? "Salvar alterações" : "Adicionar"}
        </button>
      </form>
    </div>
  );
}

export default Inventory;
