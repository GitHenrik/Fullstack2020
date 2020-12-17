const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
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
  //create the blog with mongoose model and save it 
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

module.exports = blogsRouter