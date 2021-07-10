const express = require('express')
const app = express()
const port = 8087
var cors = require("cors");
const sqlite3 = require('sqlite3');

app.use(express.json());
app.use(cors());
app.options("*", cors);
app.use(express.urlencoded({ extended: false }));


app.get('/hello', (req, res) => {
  const db = new sqlite3.Database('./db/app.db');

  let sql = `SELECT * FROM user`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      db.close();
      db.close();
      res.send(row.username);
    });
  });

  // close the database connection
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});