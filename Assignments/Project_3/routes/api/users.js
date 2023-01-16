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

const handleError = next => error => {
  if (error.name === 'ValidationError')
    return next(createError(400, error.message))

  next(error)
}

// delete a single user by id
router.delete('/:userId', (req, res, next) => {
  const { userId } = req.params

  contacts.findByIdAndRemove(userId)
    .then(() =>
      res.status(204).end()
    )
    .catch(handleError(next))
})

// return all users
router.get('/', (req, res, next) => {
  contacts.find().lean()
    .then(users => {
      res.json(users)
    })
    .catch(handleError(next))
})

// return a single user based on id
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params

  contacts.findById(userId).lean()
    .then((user) => {
      if (!user)
        return next(createError(404, `User not found with id -> ${userId}`))

      res.json(user)
    })
    .catch(handleError(next))
})

// create a new user
router.post('/', (req, res, next) => {
  contacts.create(req.body)
    .then(user =>
      res.json(user)
    )
    .catch(handleError(next))
})

// update a user user
router.put('/:userId', (req, res, next) => {
  const { userId } = req.params
  const { gender, name } = req.body

  contacts.findByIdAndUpdate(userId, {
    $set: { gender, name }
  },
  {
    new: true,
    runValidators: true
  }
  )
    .then(user => {
      if (!user)
        return next(createError(404, `User not found with id -> ${userId}`))

      res.json(user)
    })
    .catch(handleError(next))
})

module.exports = router
