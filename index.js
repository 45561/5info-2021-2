const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Resposta pelo metodo GET");
});

app.post("/", function (req, res) {
  console.log("Executando metodo POST");
  res.send("Resposta pelo metodo POST");
});

app.get("/:nome/:sobrenome", function (req, res) {
  res.send("Oi " + req.params.nome + " " + req.params.sobrenome);
});

app.listen("3000", function () {
  console.log("Conexao iniciada!");
});
