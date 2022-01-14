const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Resposta pelo metodo GET");
});

app.listen("3000", function () {
  console.log("Conexao iniciada!");
});
