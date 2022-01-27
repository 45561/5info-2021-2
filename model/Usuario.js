const conexao = require("../config/conexao.js");

var UsuarioSchema = conexao.Schema({
  nome: { type: "String" },
  email: { type: "String" },
  senha: { type: "String" },
  foto: { type: "String" },
});

module.exports = conexao.model("Usuario", UsuarioSchema);
