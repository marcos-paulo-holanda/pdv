const express = require("express");
const db = require("../database");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Listar todos os produtos
router.get("/products", verifyToken, (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar produtos" });
      res.json(rows);
    });
  });
  
  // Adicionar novo produto
  router.post("/products", verifyToken, (req, res) => {
    const { name, sku, price, quantity } = req.body;
    db.run("INSERT INTO products (name, sku, price, quantity) VALUES (?, ?, ?, ?)",
      [name, sku, price, quantity],
      (err) => {
        if (err) return res.status(400).json({ error: "Erro ao adicionar produto" });
        res.json({ success: true });
      }
    );
  });
  
  // Atualizar produto
  router.put("/products/:id", verifyToken, (req, res) => {
    const { name, sku, price, quantity } = req.body;
    const { id } = req.params;
    db.run("UPDATE products SET name=?, sku=?, price=?, quantity=? WHERE id=?",
      [name, sku, price, quantity, id],
      (err) => {
        if (err) return res.status(500).json({ error: "Erro ao atualizar produto" });
        res.json({ success: true });
      }
    );
  });
  
  // Excluir produto
  router.delete("/products/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM products WHERE id=?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Erro ao excluir produto" });
      res.json({ success: true });
    });
  });


router.get("/produtos", verifyToken, (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
      res.json(rows);
    });
  });
  
  router.post("/entrada", verifyToken, (req, res) => {
    const { name, quantity } = req.body;
    db.get("SELECT * FROM products WHERE name = ?", [name], (err, product) => {
      if (product) {
        db.run("UPDATE products SET quantity = quantity + ? WHERE name = ?", [quantity, name]);
      } else {
        db.run("INSERT INTO products (name, quantity) VALUES (?, ?)", [name, quantity]);
      }
      res.json({ message: "Entrada registrada" });
    });
  });
  
  router.post("/saida", verifyToken, (req, res) => {
    const { name, quantity } = req.body;
    db.run("UPDATE products SET quantity = quantity - ? WHERE name = ?", [quantity, name], function (err) {
      if (err) return res.status(500).json({ message: "Erro ao registrar saída" });
      res.json({ message: "Saída registrada" });
    });
  });

  module.exports = router;