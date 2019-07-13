const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const calcadosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nome: { type: String, required: true },
  marca: { type: String, require: true},
  foto: { type: String, required: true },
  tipo: { type: String, require: true},
  numero: { type: Number, require: true },
})

const calcadosModel = mongoose.model("calcados", calcadosSchema);

module.exports = { calcadosModel, calcadosSchema };
