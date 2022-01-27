const mongoose = require("mongoose");

const uri =
  "mongodb+srv://aluno:aluno@5info20212.djh8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
