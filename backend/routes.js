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
  db.run("INSERT INTO sales (items, total, payment_method) VALUES (?, ?, ?)",
    [jsonItems, total, payment_method], function (err) {
      if (err) return res.status(500).json({ error: "Erro ao registrar venda" });
      res.json({ success: true });
    });
});


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