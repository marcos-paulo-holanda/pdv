import { useState, useEffect } from "react";
import { registerSale, getTodaySales, getProducts } from "../../api";

function Sales({ token }) {
  const [cart, setCart] = useState([]);
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const [salesToday, setSalesToday] = useState([]);

  useEffect(() => {
    loadSales();
    loadProducts();
  }, []);

  const loadSales = async () => {
    const data = await getTodaySales(token);
    setSalesToday(data);
  };

  const loadProducts = async () => {
    const list = await getProducts(token);
    setProducts(list);
  };

  const addToCart = () => {
    if (!productName || !price || quantity <= 0 || !sku) return;

    setCart([
      ...cart,
      {
        sku,
        name: productName,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      },
    ]);

    // limpar campos
    setProductName("");
    setSku("");
    setPrice("");
    setQuantity(1);
  };

  const finalizeSale = async () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await registerSale(token, cart, total, paymentMethod);
    alert("Venda registrada!");
    setCart([]);
    loadSales();
    loadProducts(); // opcional: recarrega estoque atualizado
  };

  // 🔄 sincroniza nome ↔ sku
  const handleProductNameChange = (value) => {
    setProductName(value);
    const found = products.find((p) => p.name.toLowerCase() === value.toLowerCase());
    if (found) {
      setSku(found.sku);
      setPrice(found.price);
    }
  };

  const handleSkuChange = (value) => {
    setSku(value);
    const found = products.find((p) => p.sku.toLowerCase() === value.toLowerCase());
    if (found) {
      setProductName(found.name);
      setPrice(found.price);
    }
  };

  const totalCart = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Registrar Venda</h2>

      <div style={styles.form}>
        <input
          list="product-names"
          placeholder="Produto"
          value={productName}
          onChange={(e) => handleProductNameChange(e.target.value)}
          style={styles.input}
        />
        <datalist id="product-names">
          {products.map((p) => (
            <option key={p.id} value={p.name} />
          ))}
        </datalist>

        <input
          placeholder="SKU"
          value={sku}
          onChange={(e) => handleSkuChange(e.target.value)}
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
                <th style={styles.th}>Produto</th>
                <th style={styles.th}>SKU</th>
                <th style={styles.th}>Qtd</th>
                <th style={styles.th}>Preço</th>
                <th style={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.sku}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td style={styles.td}>R$ {item.price.toFixed(2)}</td>
                  <td style={styles.td}>R$ {(item.price * item.quantity).toFixed(2)}</td>
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
            <th style={styles.th}>Data/Hora</th>
            <th style={styles.th}>Descrição Itens</th>
            <th style={styles.th}>Qtd</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {salesToday.map((sale) => {
            const items = JSON.parse(sale.items);
            return (
              <tr key={sale.id}>
                <td style={styles.td}>
                  {new Date(sale.created_at).toLocaleString("pt-BR")}
                </td>
                <td style={styles.td}>
                  {items.map((i, idx) => (
                    <div key={idx}>{i.name}</div>
                  ))}
                </td>
                <td style={styles.td}>
                  {items.map((i, idx) => (
                    <div key={idx}>{i.quantity}</div>
                  ))}
                </td>
                <td style={styles.td}>R$ {sale.total.toFixed(2)}</td>
                <td style={styles.td}>{sale.payment_method}</td>
              </tr>
            );
          })}
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
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center"
  },
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f0f0f0",
    textAlign: "center"
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