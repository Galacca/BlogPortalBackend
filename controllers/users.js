const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {

    const body = request.body
    const userNameIsInDatabase = await User.findOne({ 'username': body.username }, 'username')

    if (userNameIsInDatabase)
    {
      response.status(400).json({ error: 'Username already exists in the database. Provide a different username.' })
    } else if(body.password.length < 3) {
      response.status(400).json({ error: 'Password needs to contain 3 or more characters.' })
    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        over18: body.over18,
        passwordHash
      })

      if (user.over18 === undefined){
        user.over18 = true
      }

      const savedUser = await user.save()
      response.json(User.format(savedUser))
    }}
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went very, very wrong.' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1 })
  response.json(users.map(User.format))
})

module.exports = usersRouter