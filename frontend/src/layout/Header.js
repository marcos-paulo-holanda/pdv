function Header() {
    return (
      <header style={styles.header}>
        <h1 style={styles.title}>Sistema PDV</h1>
      </header>
    );
  }
  
  const styles = {
    header: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "15px 30px",
      textAlign: "left",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000
    },
    title: {
      margin: 0,
      fontSize: "1.5rem"
    }
  };
  
  export default Header;
  