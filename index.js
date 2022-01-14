const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "/src", "/telas"));

app.get("/:nome", function (req, res) {
  res.render("index.ejs", { nome: req.params.nome });
});

app.listen("3000", function () {
  console.log("Conexao iniciada!");
});
