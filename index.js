const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Resposta pelo metodo GET");
});

app.post("/", function (req, res) {
  console.log("Executando metodo POST");
  res.send("Resposta pelo metodo POST");
});

app.listen("3000", function () {
  console.log("Conexao iniciada!");
});
