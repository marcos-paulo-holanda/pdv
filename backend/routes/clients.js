const express = require("express");
const db = require("../database");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Listar clientes
router.get("/customers", verifyToken, (req, res) => {
    db.all("SELECT * FROM customers", [], (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar clientes" });
      res.json(rows);
    });
  });
  
  // Cadastrar cliente
  router.post("/customers", verifyToken, (req, res) => {
    const { name, document, phone, email, address } = req.body;
    db.run("INSERT INTO customers (name, document, phone, email, address) VALUES (?, ?, ?, ?, ?)",
      [name, document, phone, email, address],
      err => {
        if (err) return res.status(500).json({ error: "Erro ao adicionar cliente" });
        res.json({ success: true });
      });
  });
  
  // Atualizar cliente
  router.put("/customers/:id", verifyToken, (req, res) => {
    const { name, document, phone, email, address } = req.body;
    db.run("UPDATE customers SET name=?, document=?, phone=?, email=?, address=? WHERE id=?",
      [name, document, phone, email, address, req.params.id],
      err => {
        if (err) return res.status(500).json({ error: "Erro ao atualizar cliente" });
        res.json({ success: true });
      });
  });
  
  // Excluir cliente
  router.delete("/customers/:id", verifyToken, (req, res) => {
    db.run("DELETE FROM customers WHERE id=?", [req.params.id], err => {
      if (err) return res.status(500).json({ error: "Erro ao excluir cliente" });
      res.json({ success: true });
    });
  });

  module.exports = router;