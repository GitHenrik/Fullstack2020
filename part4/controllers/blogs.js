const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')
//modified to use async/await-syntax instead of response chaining
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

//tasks 4.11* and 4.12* included
blogsRouter.post('/', async (request, response) => {
  //if url or title is missing, response with 400 bad request
  const missingUrlOrTitle = !request.body.url || !request.body.title
  if (missingUrlOrTitle) {
    //console.log('***************** URL or title was missing, sending 400 bad request')
    return response.status(400).end()
  }
  //add likes-field if it is missing
  if (!request.body.likes)
    request.body.likes = 0

  //find the creator of the blog post, based on the request
  const user = await User.findById(request.body.userId)
  console.log('found this user for the blog:', user)

  //create the blog with mongoose model and save it 
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.notes = user.notes.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  // Blog.findById(request.params.id)
  //   .then(blog => {
  //     if (blog) {
  //       response.json(blog.toJSON())
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
  const singleBlog = await Blog.findById(request.params.id)
  if (singleBlog)
    response.json(singleBlog.toJSON())
  else
    response.status(404).end()
})

//course task 4.13
blogsRouter.delete('/:id', async (req, res) => {
  const deletedBlog = await Blog.findByIdAndRemove(req.params.id)
  //console.log('data to delete:', deletedBlog)
  if (deletedBlog)
    res.status(204).end()
  else
    res.status(400).end()
})

//course task 4.14*
blogsRouter.put('/:id', async (req, res) => {
  //check for missing data in the body (everything except likes are required)
  if (!req.body.title || !req.body.author || !req.body.url) {
    return res.status(400).json({ error: 'Data is missing' })
  }
  if (!req.body.likes)
    req.body.likes = 0
  const oldBlog = await Blog.findById(req.params.id)
  //console.log("likes to update: ", oldBlog.likes)
  req.body.likes += oldBlog.likes
  //console.log("updated body: ", req.body)
  await Blog.findByIdAndUpdate(req.params.id, req.body)
  const updatedBlog = await Blog.findById(req.params.id)
  res.json(updatedBlog)
})

module.exports = blogsRouter