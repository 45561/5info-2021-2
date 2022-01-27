const express = require("express");
const app = express();
const path = require("path");
const cookieparser = require("cookie-parser");
var flash = require("connect-flash");
var session = require("express-session");

//importação do modelos
const Usuario = require("./model/Usuario");

app.use(session({ secret: "senha", saveUninitialized: false, resave: false }));
app.use(flash());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());

app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "/src", "/views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  Usuario.find({}).exec(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.render("index.ejs", { Usuarios: docs, msg: req.flash("msg") });
    }
  });
});

app.get("/add", function (req, res) {
  res.render("add.ejs", {});
});

app.post("/add", function (req, res) {
  var usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto: req.body.foto,
  });

  usuario.save(function (err) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      req.flash("msg", "Usuário adicionado com sucesso!");
      res.redirect("/");
    }
  });
});

app.get("/del/:id", function (req, res) {
  Usuario.findByIdAndDelete(req.params.id).exec(function (err) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      req.flash("msg", "Usuário deletado com sucesso!");
      res.redirect("/");
    }
  });
});

app.listen("3000", function () {
  console.log("Conexao iniciada!");
});
