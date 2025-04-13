const express = require("express");
const db = require("../database");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Listar todas as vendas
router.get("/sales", verifyToken, (req, res) => {
  db.all("SELECT * FROM sales ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar vendas" });
    res.json(rows);
  });
});

// Registrar uma nova venda
router.post("/sales", verifyToken, (req, res) => {
  const { items, total, payment_method } = req.body;
  const jsonItems = JSON.stringify(items);

  db.run(
    "INSERT INTO sales (items, total, payment_method) VALUES (?, ?, ?)",
    [jsonItems, total, payment_method],
    function (err) {
      if (err) return res.status(500).json({ error: "Erro ao registrar venda" });

      // 🔻 Atualizar estoque para cada item vendido
      items.forEach((item) => {
        db.run(
          "UPDATE products SET quantity = quantity - ? WHERE sku = ?",
          [item.quantity, item.sku],
          (err) => {
            if (err) {
              console.error(`Erro ao atualizar estoque para SKU ${item.sku}:`, err.message);
            }
          }
        );
      });

      res.json({ success: true });
    }
  );
});

module.exports = router;
