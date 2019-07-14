require('dotenv-safe').load()
const { connect } = require('./receitasApiRepository')
const receitasModel = require('./receitasSchema')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

connect()

const getAll = () => {
  return receitasModel.find((error, receitas) => {
    return receitas
  })
}

const add = (receitas) => {
  const novaReceita = new receitasModel(receitas)
  return novaReceita.save()
}


module.exports = {
  getAll,
  add,
}