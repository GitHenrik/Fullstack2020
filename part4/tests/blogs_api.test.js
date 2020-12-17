const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    'title': 'Blog 1',
    'author': 'Secret Author',
    'url': 'www.blog.com',
    'likes': 9,
  },
  {
    'title': 'Blog 2',
    'author': 'Secret Author 2',
    'url': 'www.blog2.com',
    'likes': 2,
  },
  {
    'title': 'Blog 3',
    'author': 'Secret Author 3',
    'url': 'www.blog3.com',
    'likes': 1,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

//course task 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is a correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blogs title is included in the data', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)
  expect(titles).toContain('Blog 1')
})

//course task 4.9*
test('ID-field is called id', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body)
  const ids = response.body.map(blog => blog.id)
  expect(ids).toBeDefined()
})

//course task 4.10
test('post can be added', async () => {
  const newBlog = await new Blog({
    'title': 'Blog 4',
    'author': 'Secret Author 4',
    'url': 'www.blog3.com',
    'likes': 67,
  })
  await newBlog.save()
  const response = await api.get('/api/blogs')
  //const newBlogAfterPosting = await response.body[response.body.length - 1]
  //console.log(newBlogAfterPosting)
  //console.log('the new length is ', response.body.length)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})


afterAll(() => {
  mongoose.connection.close()
})