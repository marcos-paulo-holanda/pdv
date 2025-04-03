const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./database");
const { generateToken, verifyToken } = require("./auth");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const token = generateToken(user);
    res.json({ token });
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