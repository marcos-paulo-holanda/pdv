import { useEffect, useState } from "react";
import { getProdutos, entrada, saida } from "./api";

function Dashboard({ token }) {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [qtd, setQtd] = useState(1);

  const atualizar = async () => {
    const lista = await getProdutos(token);
    setProdutos(lista);
  };

  useEffect(() => {
    atualizar();
  }, []);

  const registrarEntrada = async () => {
    await entrada(token, nome, Number(qtd));
    atualizar();
  };

  const registrarSaida = async () => {
    await saida(token, nome, Number(qtd));
    atualizar();
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {produtos.map((p) => (
          <li key={p.id}>{p.name} - {p.quantity}</li>
        ))}
      </ul>

      <h3>Registrar Entrada/Saída</h3>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do produto" />
      <input type="number" value={qtd} onChange={(e) => setQtd(e.target.value)} />
      <button onClick={registrarEntrada}>Entrada</button>
      <button onClick={registrarSaida}>Saída</button>
    </div>
  );
}

export default Dashboard;