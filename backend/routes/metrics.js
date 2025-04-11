const db = require("../database");
const { verifyToken } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/metrics", verifyToken, (req, res) => {
    db.serialize(() => {
      let totalRevenue = 0;
      let salesCount = 0;
      let productCount = 0;
  
      db.all("SELECT total FROM sales", [], (err, sales) => {
        if (sales) {
          totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
          salesCount = sales.length;
        }
  
        db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
          if (row) productCount = row.count;
  
          res.json({
            totalRevenue,
            salesCount,
            productCount,
          });
        });
      });
    });
  });
  
  router.get("/sales/today", verifyToken, (req, res) => {
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    db.all(
      "SELECT * FROM sales WHERE date(created_at) = ? ORDER BY created_at DESC",
      [today],
      (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar vendas" });
        res.json(rows);
      }
    );
  });

  module.exports = router;