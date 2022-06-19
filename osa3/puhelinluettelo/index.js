const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]
  app.get('/info', (req, res) => {
    let time = new Date().toString()

    res.send( `<p>
        <span>Phonebook has info for ${persons.length} people</span></p>
        <span>${time}</span>`)
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })