const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Arvid:${password}@cluster0.lqo6iun.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!name && !number) {
  Person.find({}).then((personData) => {
    console.log('phonebook:')
    personData.forEach((person) =>
      console.log(`${person.name} ${person.number}`)
    )
    mongoose.connection.close()
  })
}

if (name && number) {
  const person = new Person({
    name,
    number,
  })

  person.save().then((res) => {
    console.log(`Added ${res.name} ${res.number} to phonebook`)
    mongoose.connection.close()
  })
}
