const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body?.likes) {
    body.likes = 0
  }

  try {
    const newBlog = await new Blog(body).save()
    if (!body?.title || !body?.url) {
      response.status(400).end()
    } else {
      response.status(201).json(newBlog)
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    await Blog.findByIdAndRemove(id)
    response.status(200).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
