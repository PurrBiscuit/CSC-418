const createError = require('http-errors')
const express = require('express')
const router = express.Router()

const contacts = require('../../lib/model/contact')

// return all users
router.get('/', (req, res) => {
  contacts.find().lean()
    .then(records => {
      res.json(records)
    })
})

// return a single user based on id
router.get('/:userId', (req, res) => {
  contacts.findById(req.params.userId).lean()
    .then(({ gender, id, name }) => {
      res.json({ gender, id, name })
    })
})

module.exports = router
