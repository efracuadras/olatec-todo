const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const PORT = 8181;
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootPassword",
  database: "todo",
});

app.use(bodyParser.json());

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.get("/items", (req, res) => {
  const sql = "SELECT * FROM todo.items";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/items", (req, res) => {
  const sql = "INSERT INTO todo.items SET ?";
  const params = {
    text: req.body.text,
    status: 1,
  };
  connection.query(sql, params, (error, results) => {
    if (error) throw error;

    connection.query(
      `SELECT * FROM todo.items WHERE id = ${results.insertId}`,
      (error, results) => {
        if (error) throw error;

        res.send(results[0]);
      }
    );
  });
});

app.patch("/items/:id", (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE todo.items SET ? WHERE id = ${id}`;
  connection.query(sql, req.body, (err) => {
    if (err) throw err;
    res.send("Prospect updated!");
  });
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM todo.items WHERE id = ${id}`;
  connection.query(sql, (error) => {
    if (error) throw error;
    res.send(`Task with id ${id}deleted`);
  });
});

app.listen(PORT, () => console.log(`server port: ${PORT}`));
