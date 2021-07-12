require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(cors())

morgan.token('person', (request) => {
  if (request.method === 'POST') 
  	return JSON.stringify(request.body)
  else
  	return ''
})

app.use(express.json())

app.use(morgan('tiny'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {

	Person.find({}).then(persons => {
		response.send(`
			<p>Phonebook has info for ${persons.length} people</p>
			<p>${new Date}</p>
			`)	
	}) 
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
	} else {
		const person = new Person({
			name: body.name,
			number: body.number,
		})

		person
			.save()
			.then((savedPerson) => response.json(savedPerson.toJSON()))
	}

})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	console.log(id);

	Person.findByIdAndRemove(id).then(() => { response.status(204).end() })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
