const express = require("express");
const app = express();
const path = require("path");
const cookieparser = require("cookie-parser");
var flash = require("connect-flash");
var session = require("express-session");
var multer = require("multer");
var uploads = multer({ dest: path.join(__dirname, "public", "usuarios") });

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

//lista todos os usuarios cadastrados
app.get("/", (req, res) => {
  Usuario.find({}).exec(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.render("index.ejs", { Usuarios: docs, msg: req.flash("msg") });
    }
  });
});

//lista com filtro todos os usuarios cadastrados
app.post("/", (req, res) => {
  Usuario.find({ nome: new RegExp(req.body.pesquisa, "g") }).exec(function (
    err,
    docs
  ) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.render("index.ejs", { Usuarios: docs, msg: req.flash("msg") });
    }
  });
});

//abrir a tela de adicionar
app.get("/add", function (req, res) {
  res.render("add.ejs", {});
});

//adicionar usuario
app.post("/add", uploads.single("foto"), function (req, res) {
  var usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto: req.file.filename,
  });

  usuario.save(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      req.flash("msg", "O Usuário " + docs.nome + " adicionado com sucesso!");
      res.redirect("/");
    }
  });
});

//deletar usuários
app.get("/del/:id", function (req, res) {
  Usuario.findByIdAndDelete(req.params.id).exec(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      req.flash("msg", "Usuário " + docs.nome + " deletado com sucesso!");
      res.redirect("/");
    }
  });
});

//abrir página de edição de usuário
app.get("/edt/:id", function (req, res) {
  Usuario.findById(req.params.id).exec(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.render("edt.ejs", { usuario: docs });
    }
  });
});

//adicionar usuario
app.post("/edt/:id", uploads.single("foto"), function (req, res) {
  Usuario.findByIdAndUpdate(req.body.id, {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto: req.file.filename,
  }).exec(function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      req.flash("msg", "O Usuário " + docs.nome + " foi alterado com sucesso!");
      res.redirect("/");
    }
  });
});

app.listen("3000", function () {
  console.log("Conexao iniciada!");
});
