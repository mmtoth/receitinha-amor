require('dotenv-safe').load()
const { connect } = require('./calcadosApiRepository')
const UsersModel = require('./UsersSchema')
const { calcadosModel } = require('./calcadosSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

connect()


const getAll = () => {
  return UsersModel.find((error, Users) => {
    return Users
  })
}

const getById = (id) => {
  return UsersModel.findById(id)
}

const add = async (User) => {
  const UserEncontrado = await UsersModel.findOne(
    { email: User.email }
  )

  if (UserEncontrado) {
    throw new Error('Email já cadastrado')
  }

  const salt = bcrypt.genSaltSync(10)
  const senhaCriptografada = bcrypt.hashSync(User.senha, salt)
  User.senha = senhaCriptografada

  const novoUser = new UsersModel(User)
  return novoUser.save()
}

const remove = (id) => {
  return UsersModel.findByIdAndDelete(id)
}

const update = (id, User) => {
  return UsersModel.findByIdAndUpdate(
    id,
    { $set: User },
    { new: true },
  )
}

const addcalcado = async (UserId, calcado) => {
  const User = await getById(UserId)
  const novocalcado = new calcadosModel(calcado)

  User.calcados.push(novocalcado)
  return User.save()
}


const getcalcados = async UserId => {
  const User = await getById(UserId)
  return User.calcados
}

const updatecalcado = (UserId, calcadoId, calcado) => {
  return UsersModel.findOneAndUpdate(
    { _id: UserId, "calcados._id": calcadoId },
    { $set: { "calcados.$": { ...calcado, _id: calcadoId } } }, // sem usar o spread operator (...), obteremos um objeto dentro de outro (ao invés de vários atributos para alterar o calcado)
    { new: true } // precisamos disso para retornar uma nova instância do calcado que encontramos, para podermos vê-lo atualizado
  )
}

const getBycalcadoId = async (UserId, calcadoId) => {
  const User = await getById(UserId)
  return User.calcados.find(calcado => {
    return calcado._id == calcadoId
  })
}

const login = async (dadosDoLogin) => {
  const UserEncontrado = await UsersModel.findOne(
    { email: dadosDoLogin.email }
  )

  if (UserEncontrado) {
    const senhaCorreta = bcrypt.compareSync(
      dadosDoLogin.senha, UserEncontrado.senha
    )

    if (senhaCorreta) {
      const token = jwt.sign(
        {
          email: UserEncontrado.email,
          id: UserEncontrado._id
        },
        process.env.PRIVATE_KEY,
        { expiresIn: 60 }
      )
      return { auth: true, token };
    } else {
      throw new Error('Senha incorreta, prestenção parça')
    }
  } else {
    throw new Error('Email não está cadastrado')
  }
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  addcalcado,
  getcalcados,
  updatecalcado,
  getBycalcadoId,
  login
}