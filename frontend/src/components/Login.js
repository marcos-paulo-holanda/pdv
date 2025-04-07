import { useState } from "react";
import { login, register } from "../api";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password || (isRegistering && !role)) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        const result = await register(username, password, role);
        if (result.success) {
          alert("Usuário cadastrado com sucesso!");
          setIsRegistering(false);
          setUsername("");
          setPassword("");
        } else {
          setError(result.message || "Erro ao cadastrar usuário.");
        }
      } else {
        const result = await login(username, password);
        if (result.token) {
          onLogin(result.token);
        } else {
          setError("Usuário ou senha inválidos.");
        }
      }
    } catch (err) {
      setError("Erro na comunicação com o servidor.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{isRegistering ? "Cadastro" : "Login"}</h2>

      <div style={styles.inputGroup}>
        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      {isRegistering && (
        <div style={styles.inputGroup}>
          <label htmlFor="role">Tipo de Usuário</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="cashier">Caixa</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Aguarde..." : isRegistering ? "Cadastrar" : "Entrar"}
      </button>

      <p style={{ marginTop: "10px", cursor: "pointer", color: "#007bff" }}
         onClick={() => {
           setIsRegistering(!isRegistering);
           setError("");
         }}>
        {isRegistering ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
      </p>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "300px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif"
  },
  inputGroup: {
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "0.9em",
    marginBottom: "10px"
  }
};

export default Login;
