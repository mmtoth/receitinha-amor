const mongoose = require("mongoose");
const { calcadosSchema } = require('./calcadosSchema')
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  nome: { type: String, required: true },
  dataNascimento: { type: Number, require: true },
  calcados: [calcadosSchema]
})

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;