require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))

morgan.token('post', (req) => {
  if (req.method === 'POST') {
    const body = JSON.stringify(req.body)
    return body
  }
  return ' '
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post')
)
app.use(express.json())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      console.log('person', person)
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'Name missing',
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'Number missing',
    })
  }

  const person = new Person({ name: body.name, number: body.number })

  person
    .save()
    .then((createdPerson) => {
      res.json(createdPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/api/info', (req, res) => {
  const date = new Date()
  Person.find({}).then((result) => {
    const response = `<p>Phonebook has info on ${result.length} people</p>
        <p>${date}</p>
    `
    res.send(response)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)

// error handlers
const errorHandler = (error, req, res, next) => {
  console.log('ERROR HANDLER', error)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
