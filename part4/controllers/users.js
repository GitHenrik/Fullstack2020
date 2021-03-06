const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

//task 4.17 population: displays some distinct data 
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blog', { title: 1, url: 1, author: 1 })
  res.json(users.map(user => user.toJSON()))
  // old implementation without populate
  // const users = await User.find({})
  // res.json(users.map(user => user.toJSON()))
})

usersRouter.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndRemove(req.params.id)
  //console.log('data to delete:', deletedBlog)
  if (deletedUser)
    res.status(204).end()
  else
    res.status(400).end()
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