import { useState } from "react";
import { registerSale } from "../../api";

function Sales({ token }) {
  const [cart, setCart] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");

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
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registrar Venda</h2>
      <div style={{ marginBottom: "10px" }}>
        <input placeholder="Produto" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <input placeholder="Preço" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Qtd" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button onClick={addToCart}>Adicionar</button>
      </div>

      <h3>Carrinho</h3>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>{item.name} - {item.quantity} x R$ {item.price.toFixed(2)}</li>
        ))}
      </ul>

      <div>
        <label>Pagamento: </label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
          <option value="pix">Pix</option>
        </select>
      </div>

      <button onClick={finalizeSale} style={{ marginTop: "10px" }}>Finalizar venda</button>
    </div>
  );
}

export default Sales;
