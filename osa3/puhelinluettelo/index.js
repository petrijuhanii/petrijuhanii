require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('person', function (req) {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.get('/info', async (req, res) => {
  const count = await Person.estimatedDocumentCount({})
  let time = new Date().toString()

  res.send( `<p>
        <span>Phonebook has info for ${count} people</span></p>
        <span>${time}</span>`)
})

const Person = require('./modules/person')

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  /*const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }*/
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/*const generateId = () => {
    const id = Math.random(9999999)
    console.log(id)
    return id
  }*/

app.post('/api/persons', async (request, response, next) => {
  const body = request.body
  console.log(request.body)

  /*if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }
    if (!body.number) {
        return response.status(400).json({
          error: 'number missing'
        })
      }
    if(await Person.findOne({ name: body.name })){
      return response.status(400).json({
        error: 'name must be unique'
      })
    }*/

  const person = new Person({
    name: body.name,
    number: body.number
  })
  console.log(person)

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      next(error)
    })

  //persons = persons.concat(person)

  //response.json(person)
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})