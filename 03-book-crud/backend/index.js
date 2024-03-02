import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

// enable post request
app.use(express.json());

// enable Access-Control-Allow-Origin
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is the backend section");
});

app.get("/book", (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, data) => {
    if (err) return res.json("Get Data Failed");
    return res.json(data);
  });
});

app.post("/book", (req, res) => {
  const sql = "INSERT INTO book (`title`, `description`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Post Data Failed");
    return res.json("Book is created");
  });
});

app.put("/book/:id", (req, res) => {
  const bookId = req.params.id;
  const sql =
    "UPDATE book SET `title` = ?, `description` = ?, `cover` = ? WHERE id = ?";
  const values = [req.body.title, req.body.description, req.body.cover];
  db.query(sql, [...values, bookId], (err, data) => {
    if (err) return res.json("PUT Data Failed");
    return res.json("Book is created");
  });
});

app.delete("/book/:id", (req, res) => {
  const bookId = req.params.id;
  const sql = "DELETE FROM book WHERE id = ?";

  db.query(sql, [bookId], (err, data) => {
    if (err) return res.json("Delete Data Failed");
    return res.json("Book is deleted");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
