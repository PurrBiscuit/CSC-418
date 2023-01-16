const {
  map,
  path,
  pipe,
  values
} = require('ramda')

const formatErrors =
  pipe(
    map(path(['properties', 'message'])),
    values,
  )

module.exports = {
  formatErrors
}
