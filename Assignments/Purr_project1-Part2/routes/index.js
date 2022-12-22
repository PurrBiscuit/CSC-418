const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

router.get('/add-contact', (req, res) => {
  res.render('addContactForm')
})

module.exports = router
