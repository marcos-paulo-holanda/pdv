import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside style={styles.sidebar}>
      <button style={styles.link} onClick={() => navigate("/")}>Dashboard</button>
      <button style={styles.link} onClick={() => navigate("/sales")}>Vendas</button>
      <button style={styles.link} onClick={() => navigate("/inventory")}>Estoque</button>
      <button style={styles.link} onClick={() => navigate("/customers")}>Clientes</button>
      <button style={styles.link} onClick={() => navigate("/suppliers")}>Fornecedores</button>
      <button style={{ ...styles.link, color: "red" }} onClick={() => window.location.reload()}>Sair</button>
    </aside>
  );
}

const styles = {
  sidebar: {
    position: "fixed",
    top: "70px",
    left: 0,
    width: "200px",
    height: "100%",
    backgroundColor: "#f0f0f0",
    padding: "20px 10px",
    boxSizing: "border-box",
  },
  link: {
    display: "block",
    margin: "10px 0",
    background: "none",
    border: "none",
    textAlign: "left",
    width: "100%",
    padding: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 2px rgba(0,0,0,0.2)"
  }
};

export default Sidebar;
