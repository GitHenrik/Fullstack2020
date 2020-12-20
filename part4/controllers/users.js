const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

//course tasks for part 4
usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body
  const passwordCheck = body.password
  if (!passwordCheck || passwordCheck.length < 3)
    return res.status(400).end()
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter