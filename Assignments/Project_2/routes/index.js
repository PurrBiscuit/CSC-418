const express = require('express')
const router = express.Router()

const contact = require('../lib/model/contact')
const { formatErrors } = require('../lib/utils')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/contact-us', (req, res) => {
  res.render('contact-us')
})

router.post('/contact-us', (req, res, next) => {
  contact.create(req.body)
    .then(() => {
      res.render('contact-us', {
        message: 'User Added Successfully!'
      })
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`)

      if (error.name === 'ValidationError')
        res.render('contact-us', {
          message: formatErrors(error.errors),
          messageClass: 'error'
        })
      else
        next(error)
    })
})

module.exports = router
