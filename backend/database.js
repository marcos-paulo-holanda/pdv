const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./pdv.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    quantity INTEGER
  )`);

  db.get("SELECT * FROM users WHERE username = 'admin'", (err, row) => {
    if (!row) {
      const bcrypt = require("bcryptjs");
      const hash = bcrypt.hashSync("1234", 10);
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", ["admin", hash]);
    }
  });
});

module.exports = db;