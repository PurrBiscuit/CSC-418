const express = require('express')
const router = express.Router()

const users = require('../data/users')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/contact-us', (req, res) => {
  res.render('contact-us')
})

router.post('/contact-us', (req, res) => {
  const { gender, name } = req.body

  users.push({ name, gender })

  res.render('contact-us', {
    success: true
  })
})

module.exports = router
