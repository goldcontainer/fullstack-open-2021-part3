const mongoose = require('mongoose')

if (process.argv.length < 3 || (process.argv.length > 3 && process.argv.length < 5)) {
	console.log('usage: node mongo.js <password> <name> <number>')
	process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.byyjv.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
	let count = 0
	Person
		.find({})
		.then((result) => {
			console.log('phonebook:\n')
			result.forEach((person) => {
				console.log(`${person.name} ${person.number}`)
				count += 1
			})
			console.log('\ntotal:', count)
			mongoose.connection.close()
			process.exit(1)
		})
}

if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(result => {
		console.log(`added ${result.name} number ${result.number} to phonebook`)
		mongoose.connection.close()
	}).catch((error) => {
		console.log(error)
	})
}