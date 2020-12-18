const blogsRouter = require('express').Router()
const { response } = require('express')
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

blogsRouter.get('/:id', async (request, response, next) => {
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
blogsRouter.delete('/:id', async (req, res, next) => {
  const deletedBlog = await Blog.findByIdAndRemove(req.params.id)
  //console.log('data to delete:', deletedBlog)
  if (deletedBlog)
    res.status(204).end()
  else
    res.status(400).end()
})

//course task 4.14*
//blogsRouter.put('/')

module.exports = blogsRouter