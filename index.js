const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/requestHandling.js')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const morgan = require('morgan')

app
  .use(cors())
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(express.static('build'))
  .use(middleware.tokenExtractor)
  .use('/api/blogs', blogsRouter)
  .use('/api/users', usersRouter)
  .use('/api/login', loginRouter)
  .use(middleware.error)

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('connected to database')
  })
  .catch( err => {
    console.log(err)
  })

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}