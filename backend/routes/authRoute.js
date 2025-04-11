const express = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");
const db = require("../database");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  });
});

module.exports = router;
