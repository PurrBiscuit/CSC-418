const express = require('express')
const router = express.Router()

const contacts = require('../lib/model/contact')

/* GET users listing. */
router.get('/', (req, res) => {
  contacts.find().lean()
    .then(records => {
      res.render('users', { users: records })
    })
})

module.exports = router
