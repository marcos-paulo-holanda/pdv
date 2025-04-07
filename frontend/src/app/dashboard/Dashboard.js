function Dashboard() {
    return (
      <div style={styles.container}>
        <h2>Bem-vindo ao Sistema PDV</h2>
        <p>Use o menu lateral para acessar os módulos:</p>
  
        <ul style={styles.list}>
          <li>🛒 <strong>Vendas</strong> — registre transações com diferentes formas de pagamento</li>
          <li>📦 <strong>Estoque</strong> — gerencie produtos, quantidades e alertas</li>
          <li>👤 <strong>Clientes</strong> — cadastre e consulte dados de clientes</li>
          <li>🏢 <strong>Fornecedores</strong> — mantenha informações dos seus fornecedores</li>
        </ul>
      </div>
    );
  }
  
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fefefe",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    list: {
      listStyle: "none",
      paddingLeft: 0,
      lineHeight: "1.8rem"
    }
  };
  
  export default Dashboard;
  