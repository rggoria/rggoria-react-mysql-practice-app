const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

//handle post data
app.use(express.json());

// handle server data
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error backend side [get]");
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (`name`, `email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error backend side [post]");
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?";
  const values = [req.body.name, req.body.email];
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error backend side [put]");
    return res.json(data);
  });
});

app.delete("/student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("Error backend side [delete]");
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("listening");
});
