import { useState, useEffect } from "react";
import { registerSale, getTodaySales } from "../../api";

function Sales({ token }) {
  const [cart, setCart] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const [salesToday, setSalesToday] = useState([]);

  const loadSales = async () => {
    const data = await getTodaySales(token);
    setSalesToday(data);
  };

  useEffect(() => {
    loadSales();
  }, []);

  const addToCart = () => {
    if (!productName || !price || quantity <= 0) return;
    setCart([...cart, {
      name: productName,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    }]);
    setProductName("");
    setPrice("");
    setQuantity(1);
  };

  const finalizeSale = async () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await registerSale(token, cart, total, paymentMethod);
    alert("Venda registrada!");
    setCart([]);
    loadSales();
  };

  const totalCart = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Registrar Venda</h2>

      <div style={styles.form}>
        <input
          placeholder="Produto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Preço"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Qtd"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />
        <button onClick={addToCart} style={styles.addButton}>Adicionar</button>
      </div>

      {cart.length > 0 && (
        <>
          <h3>Carrinho</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Preço</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>R$ {item.price.toFixed(2)}</td>
                  <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.paymentSection}>
            <label>Método de pagamento:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão</option>
              <option value="pix">Pix</option>
            </select>
            <strong style={{ marginLeft: "20px" }}>
              Total: R$ {totalCart.toFixed(2)}
            </strong>
            <button onClick={finalizeSale} style={styles.finalizeButton}>Finalizar venda</button>
          </div>
        </>
      )}

      <h3 style={{ marginTop: "40px" }}>Vendas de hoje</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Data/Hora</th>
            <th>Itens</th>
            <th>Total</th>
            <th>Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {salesToday.map((sale) => (
            <tr key={sale.id}>
              <td>{new Date(sale.created_at).toLocaleString("pt-BR")}</td>
              <td>
                {JSON.parse(sale.items).map((i, idx) => (
                  <div key={idx}>{i.name} x{i.quantity}</div>
                ))}
              </td>
              <td>R$ {sale.total.toFixed(2)}</td>
              <td>{sale.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },
  input: {
    padding: "5px",
    width: "150px"
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px"
  },
  paymentSection: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  finalizeButton: {
    marginLeft: "auto",
    padding: "8px 16px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default Sales;
