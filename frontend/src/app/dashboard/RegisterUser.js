import { useState, useEffect } from "react";
import { register, getUsers, deleteUser } from "../../api";

function RegisterUser({ token }) {
  const [form, setForm] = useState({ username: "", password: "", role: "cashier" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await getUsers(token);
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.username || !form.password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const res = await register(form.username, form.password, form.role);
      if (res.success) {
        setSuccess("Usuário cadastrado com sucesso!");
        setForm({ username: "", password: "", role: "cashier" });
        loadUsers();
      } else {
        setError(res.message || "Erro ao cadastrar");
      }
    } catch (err) {
      setError("Erro de comunicação com o servidor.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja excluir este usuário?")) {
      await deleteUser(token, id);
      loadUsers();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastrar Novo Usuário</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Usuário"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          style={styles.input}
        >
          <option value="admin">Administrador</option>
          <option value="cashier">Caixa</option>
        </select>
        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <h3 style={{ marginTop: "30px" }}>Usuários cadastrados</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Usuário</th>
            <th style={styles.th}>Tipo</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={styles.td}>{u.username}</td>
              <td style={styles.td}>{u.role}</td>
              <td style={styles.td}>
                <button onClick={() => handleDelete(u.id)} style={styles.deleteButton}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    padding: "8px",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
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
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
  success: {
    color: "green",
    fontSize: "0.9rem",
  },
};

export default RegisterUser;
