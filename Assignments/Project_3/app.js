const createError = require('http-errors')
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const logger = require('morgan')
const path = require('path')

const apiUsersRouter = require('./routes/api/users')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(expressLayout)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/users', apiUsersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)

  console.log(err)

  // respond with JSON for API errors
  return req.path.startsWith('/api')
    ? res.json(err)
    : res.render('error')
})

module.exports = app
