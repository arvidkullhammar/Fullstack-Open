const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body
    try {
      const user = request.user

      if (!body?.likes) {
        body.likes = 0
      }
      body.user = user._id

      const newBlog = await new Blog(body).save()

      if (!body?.title || !body?.url) {
        response.status(400).end()
      } else {
        response.status(201).json(newBlog)

        user.blogs = user.blogs.concat(newBlog._id)
        await user.save()
      }
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.delete('/all', async (request, response, next) => {
  try {
    await Blog.deleteMany()
    response.status(200).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const id = request.params.id
    try {
      const blog = await Blog.findById(id)
      const user = request.user
      if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(id)
        response.status(200).end()
      } else {
        return response.status(401).json({ error: 'token invalid' })
      }
    } catch (exception) {
      next(exception)
    }
  }
)

module.exports = blogsRouter
