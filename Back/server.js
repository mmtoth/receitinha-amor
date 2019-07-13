const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const UsersController = require('./UsersController')
const params = require('params')
const parametrosPermitidos = require('./parametrosPermitidos')
const PORT = process.env.PORT || 3001
const jwt = require('jsonwebtoken')
const logger = (request, response, next) => {
  console.log(`${new Date().toISOString()} Request type: ${request.method} to ${request.originalUrl}`)

  response.on('finish', () => {
    console.log(`${response.statusCode} ${response.statusMessage};`)
  })

  next()
}

servidor.use(cors())
servidor.use(bodyParser.json())
servidor.use(logger)

servidor.get('/', (request, response) => {
  response.send('Olá, mundo!')
})

// Rotas Users

servidor.get('/Users', async (request, response) => {
  // const authHeader = request.get('authorization')
  // let auth = false

  // if (authHeader) {
  //   const token = authHeader.split(' ')[1]
  //   jwt.verify(token, process.env.PRIVATE_KEY, function(error, decoded) {
  //     if (error) {
  //       response.send(403)
  //     } else {
  //       auth = true
  //     }
  //   })
  // } else {
  //   response.send(401)
  // }

  // if (auth) {
    UsersController.getAll()
    .then(Users => response.send(Users))
  // }
})

servidor.get('/Users/:UserId', (request, response) => {
  const UserId = request.params.UserId
  UsersController.getById(UserId)
    .then(User => {
      if(!User){
        response.sendStatus(404)
      } else {
        response.send(User)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.patch('/Users/:id', (request, response) => {
  const id = request.params.id
  UsersController.update(id, request.body)
    .then(User => {
      if(!User) { response.sendStatus(404) }
      else { response.send(User) }
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.post('/Users', (request, response) => {
  UsersController.add(request.body)
    .then(User => {
      const _id = User._id
      response.send(_id)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        response.sendStatus(400)
      } else {
        console.log(error)
        response.sendStatus(500)
      }
    })
})

servidor.post('/Users/adicionar-calcado/:UserId', (request, response) => {
  const UserId = request.params.UserId
  UsersController.addcalcado(UserId, request.body)
    .then(User => {
      const _id = User._id
      response.send(_id)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        response.sendStatus(400)
      } else {
        console.log(error)
        response.sendStatus(500)
      }
    })
})

servidor.get('/Users/:UserId/calcados', async (request, response) => {
  const UserId = request.params.UserId
  UsersController.getcalcados(UserId)
    .then(calcados => response.send(calcados))
})

servidor.patch('/Users/:UserId/calcado/:calcadoId', (request, response) => {
  const UserId = request.params.UserId
  const calcadoId = request.params.calcadoId
  UsersController.updatecalcado(UserId, calcadoId, request.body)
    .then(calcado => {
      if(!calcado) { response.sendStatus(404) }
      else { response.send(calcado) }
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.get('/Users/:UserId/calcados/:calcadoId', (request, response) => {
  const UserId = request.params.UserId
  const calcadoId = request.params.calcadoId
  UsersController.getBycalcadoId(UserId, calcadoId)
    .then(calcado => {
      if(!calcado){
        response.sendStatus(404)
      } else {
        response.send(calcado)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.post('/Users/login', (request, response) => {
  UsersController.login(request.body)
    .then(respostaDoLogin => {
      response.send(respostaDoLogin)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        console.log(error)
        response.sendStatus(400)
      } else {
        console.log(error)
        response.sendStatus(500)
      }
    })
})

servidor.listen(PORT)
console.info(`Rodando na porta ${PORT}`)
