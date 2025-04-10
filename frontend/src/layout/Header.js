function Header() {
    return (
      <header style={styles.header}>
        <h1 style={styles.title}>Sistema PDV-Igor</h1>
      </header>
    );
  }
  
  const styles = {
    header: {
      backgroundColor: "#030012",
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
      fontSize: "1.5rem",
      textAlign: "center"
    }
  };
  
  export default Header;
  