const express = require('express')
const router = express.Router()

const users = require('../data/users')

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('users', { users })
})

module.exports = router
