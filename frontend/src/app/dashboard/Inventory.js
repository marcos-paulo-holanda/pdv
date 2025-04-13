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
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>SKU</th>
            <th style={styles.th}>Preço</th>
            <th style={styles.th}>Qtd</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} style={p.quantity < 5 ? styles.lowStock : {}}>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>{p.sku}</td>
              <td style={styles.td}>R$ {p.price.toFixed(2)}</td>
              <td style={styles.td}>{p.quantity}</td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(p)}>Editar</button>{" "}
                <button onClick={() => handleDelete(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editingId ? "Editar Produto" : "Adicionar Produto"}</h3>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Preço"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Quantidade"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          {editingId ? "Salvar alterações" : "Adicionar"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    maxWidth: "600px",
    marginTop: "20px"
  },
  input: {
    padding: "8px",
    margin: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "calc(25% - 12px)",
    boxSizing: "border-box"
  },
  submitButton: {
    marginTop: "10px",
    padding: "10px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden"
  },
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f0f0f0",
    textAlign: "center"
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center"
  },
  lowStock: {
    backgroundColor: "#ffe5e5"
  }
};

export default Inventory;
