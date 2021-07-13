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

app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then((persons) => {
			response.json(persons.map((person) => person.toJSON()))
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body
	console.log(body)
	if (body.name === undefined || body.number === undefined) {
		return response.status(400).json({ error: 'undefined name or number' })
	} else {
		const person = new Person({
			name: body.name,
			number: body.number,
		})

		person
			.save()
			.then((savedPerson) => {
				response.json(savedPerson.toJSON())
			})
			.catch(error => next(error))
	}

})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	const id = request.params.id

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(id, person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson.toJSON())
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	console.log(id)

	Person.findByIdAndRemove(id)
		.then(() => { response.status(204).end() })
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	// console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if(error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
