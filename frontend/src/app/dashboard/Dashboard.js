import { useEffect, useState } from "react";
import { getMetrics } from "../../api";

function Dashboard({ token }) {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    salesCount: 0,
    productCount: 0,
  });

  useEffect(() => {
    async function load() {
      const data = await getMetrics(token);
      setMetrics(data);
    }
    load();
  }, [token]);

  return (
    <div>
      <div style={styles.metricsContainer}>
        <Card
          title="Receita Total"
          icon="💰"
          value={`R$ ${metrics.totalRevenue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          subtitle="Receita do último mês"
        />
        <Card
          title="Venda"
          icon="🛒"
          value={`+${metrics.salesCount}`}
          subtitle="Vendas no último mês"
        />
        <Card
          title="Produtos"
          icon="📦"
          value={metrics.productCount.toLocaleString("pt-BR")}
          subtitle="Produtos totais cadastrados"
        />
      </div>

      <div style={styles.welcomeBox}>
        <h2>Bem-vindo ao Sistema PDVIgor</h2>
        <p>Use o menu lateral para acessar os módulos:</p>
        <ul style={styles.list}>
          <li>🛒 <strong>Vendas</strong> — registre transações com diferentes formas de pagamento</li>
          <li>📦 <strong>Estoque</strong> — gerencie produtos, quantidades e alertas</li>
          {/* <li>👤 <strong>Clientes</strong> — cadastre e consulte dados de clientes</li> */}
          {/* <li>🏢 <strong>Fornecedores</strong> — mantenha informações dos seus fornecedores</li> */}
        </ul>
      </div>
    </div>
  );
}

function Card({ title, icon, value, subtitle }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <span style={{ fontSize: "1.5rem" }}>{icon}</span>
      </div>
      <h2 style={styles.value}>{value}</h2>
      <p style={styles.subtitle}>{subtitle}</p>
    </div>
  );
}

const styles = {
  metricsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  card: {
    flex: "1",
    minWidth: "250px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  value: {
    margin: 0,
    fontSize: "1.8rem",
  },
  subtitle: {
    color: "green",
    fontSize: "0.9rem",
    marginTop: "5px",
  },
  welcomeBox: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fefefe",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
    lineHeight: "1.8rem",
  },
};

export default Dashboard;
