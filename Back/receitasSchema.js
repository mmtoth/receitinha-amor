const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const receitasSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  receita: { type: String, required: true },
  motivo: { type: String },
  tipo: { type: String, required: true },
  ingredientes: { type: String, required: true },
  preparo: { type: String, required: true },
})

const receitasModel = mongoose.model("receitas", receitasSchema);

module.exports = receitasModel;