const express = require("express");
const db = require("../database");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Listar fornecedores
router.get("/suppliers", verifyToken, (req, res) => {
    db.all("SELECT * FROM suppliers", [], (err, rows) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar fornecedores" });
      res.json(rows);
    });
  });
  
  // Cadastrar fornecedor
  router.post("/suppliers", verifyToken, (req, res) => {
    const { name, document, phone, email, address } = req.body;
    db.run("INSERT INTO suppliers (name, document, phone, email, address) VALUES (?, ?, ?, ?, ?)",
      [name, document, phone, email, address],
      err => {
        if (err) return res.status(500).json({ error: "Erro ao adicionar fornecedor" });
        res.json({ success: true });
      });
  });
  
  // Atualizar fornecedor
  router.put("/suppliers/:id", verifyToken, (req, res) => {
    const { name, document, phone, email, address } = req.body;
    db.run("UPDATE suppliers SET name=?, document=?, phone=?, email=?, address=? WHERE id=?",
      [name, document, phone, email, address, req.params.id],
      err => {
        if (err) return res.status(500).json({ error: "Erro ao atualizar fornecedor" });
        res.json({ success: true });
      });
  });
  
  // Excluir fornecedor
  router.delete("/suppliers/:id", verifyToken, (req, res) => {
    db.run("DELETE FROM suppliers WHERE id=?", [req.params.id], err => {
      if (err) return res.status(500).json({ error: "Erro ao excluir fornecedor" });
      res.json({ success: true });
    });
  });

  module.exports = router;