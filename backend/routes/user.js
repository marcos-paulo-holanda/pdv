const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (user) return res.json({ success: false, message: "Usuário já existe" });

    db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hash, role],
      (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
      }
    );
  });
});

router.get("/users", verifyToken, (req, res) => {
  db.all("SELECT id, username, role FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar usuários" });
    res.json(rows);
  });
});

router.delete("/users/:id", verifyToken, (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao excluir usuário" });
    res.json({ success: true });
  });
});

module.exports = router;
