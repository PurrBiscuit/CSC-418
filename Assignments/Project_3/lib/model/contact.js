const mongoose = require('mongoose')
const { Schema } = mongoose

const nameInvalidMessage = 'Enter first and last name.  Names can contain only letters and dashes.'
const namePattern = /^[a-zA-Z](?:[a-zA-Z-]*[a-zA-Z]+)?\s[a-zA-Z](?:[a-zA-Z-]*[a-zA-Z]+)?$/

const genderInvalidMessage = 'Please enter either male or female.'
const genderPattern = /^(Male|male|female|Female)$/

const requiredMessage = 'Please enter a value for the required field.'

const schema = new Schema({
  name: {
    type: String,
    validate: [ namePattern, nameInvalidMessage ],
    required: [ true, requiredMessage ]
  },
  gender: {
    type: String,
    validate: [ genderPattern, genderInvalidMessage ],
    required: [ true, requiredMessage ]
  },
})

module.exports = mongoose.model('contacts', schema)
