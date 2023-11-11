const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks',
    url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
    likes: 10,
    __v: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()
  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()
})

describe('When there is initially som blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('the third blog is about testing', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((blog) => blog.title)
    expect(contents).toContain('Go To Statement Considered Harmful')
  })
  test('Blog has a Id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body[0].id
    expect(contents).toBeDefined()
  })
})

describe('Addition of a blog', () => {
  test('returns the blog', async () => {
    const newBlog = {
      title: 'Newest blog',
      author: 'Anna',
      url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
      likes: 3,
    }
    const response = await api.post('/api/blogs').send(newBlog)
    const newBlogContents = response.body

    const getRequest = await api.get('/api/blogs')
    const getRequestContents = getRequest.body

    const newBlogIdExists = getRequestContents.find(
      (blog) => blog.id === newBlogContents.id
    )
    expect(newBlogIdExists).toBeDefined()
  }, 10000)

  test('gets 0 likes if none are entered', async () => {
    const newBlog = {
      title: 'No likes',
      author: 'Anna',
      url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
    }
    const response = await api.post('/api/blogs').send(newBlog)
    const contents = response.body
    expect(contents.likes).toBe(0)
  }, 10000)

  test('Receives 400 error if title or URL is missing', async () => {
    const noTitle = {
      author: 'Anna',
      url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
    }
    const noUrl = {
      title: 'Anna',
      author: 'Anna',
    }

    await api.post('/api/blogs').send(noTitle).expect(400)
    await api.post('/api/blogs').send(noUrl).expect(400)
  })
})

describe('Deletion of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const getResponse = await api.get('/api/blogs')
    const blogs = getResponse.body
    const lastBlog = blogs[blogs.length - 1]
    await api.delete(`/api/blogs/${lastBlog.id}`).expect(200)
  })
})

describe('Creation of a user', () => {
  test('Fails with statuscode 400 if username is too short', async () => {
    const userWithShortUsername = {
      username: 'Te',
      Name: 'Test',
      password: 'Test123',
    }

    const errorResponse = await api
      .post('/api/users')
      .send(userWithShortUsername)
      .expect(400)
    const contents = errorResponse.body
    expect(contents.error).toBe(
      'User validation failed: username: Path `username` (`Te`) is shorter than the minimum allowed length (3).'
    )
  })
  test('Fails with statuscode 400 if password is too short', async () => {
    const userWithShortPassword = {
      username: 'Test',
      Name: 'Test',
      password: 'Te',
    }
    const errorResponse = await api
      .post('/api/users')
      .send(userWithShortPassword)
      .expect(400)

    const contents = errorResponse.body

    //fortsätt här
    expect(contents.error).toBe('Password should have 3 letters or more')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
