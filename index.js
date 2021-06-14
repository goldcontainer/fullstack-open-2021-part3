require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('person', (request) => {
  if (request.method === 'POST') return JSON.stringify(req.body)
  return null
})

app.use(morgan('tiny'))
app.use(express.static('build'))
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
	const len = persons.length
	const date = new Date().toString()
	response.send(`<p>Phonebook has info for ${len} people <br />
		${date}</p>`)
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()));
  });
});

app.get('/api/notes/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

const generateId = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (body.name === undefined || body.number === undefined) {
		return response.status(400).json({ error: 'undefined name or number' })
	}

	const person = new Person({
		name: request.name,
		number: request.number,
	})

	person
		.save()
		.then((savedPerson) => response.json(savedPerson.toJSON()))
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
