const createError = require('http-errors')
const express = require('express')
const router = express.Router()

const contacts = require('../../lib/model/contact')

const contentTypeCheck = (req, res, next) => {
  if (!req.query || !req.query.format)
    return res.status(400).send('Please include the format query string in your request.')

  if (req.query.format !== 'json')
    return res.status(400).send('Format not supported - please use json.')

  next()
}

router.use(contentTypeCheck)

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
    .then((record) => {
      if (!record) {
        const error = createError(404)
        return res.status(error.status).send(error)
      }

      res.json(record)
    })
    .catch(error => {
      res.status(500).send(createError(error.message))
    })
})

module.exports = router
