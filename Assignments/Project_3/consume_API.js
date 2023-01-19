const request = require("request");

let testUserOneId, testUserTwoId

const main = () => request.post(
  'http://localhost:3000/api/users?format=json',
  {
    body: {
      name: 'Test UserOne',
      gender: 'Male'
    },
    json: true,
  },
  (error, res, body) => {
    console.log('*** Create Test UserOne Response ***\n', body)
    testUserOneId = body._id

    createTestUserTwo()
  }
)

const createTestUserTwo = () => request.post(
  'http://localhost:3000/api/users?format=json',
  {
    body: {
      name: 'Test UserTwo',
      gender: 'Female'
    },
    json: true,
  },
  (error, res, body) => {
    console.log('\n*** Create Test UserTwo Response ***\n', body)
    testUserTwoId = body._id

    createTestUserThree()
  }
)

const createTestUserThree = () => request.post(
  'http://localhost:3000/api/users?format=json',
  {
    body: {
      name: 'Test UserThree',
      gender: 'Female'
    },
    json: true,
  },
  (error, res, body) => {
    console.log('\n*** Create Test UserThree Response ***\n', body)
    testUserTwoId = body._id

    getUser(testUserOneId)
  }
)

// get a user's details
const getUser = id => request.get(
  `http://localhost:3000/api/users/${id}?format=json`,
  (error, res, body) => {
    console.log('\n*** Get Test UserOne Response ***\n', body)
    deleteUser(testUserOneId)
})

// delete a user
const deleteUser = id => request.delete(
  `http://localhost:3000/api/users/${id}?format=json`,
  (error, res) => {
    console.log('\n*** Delete Test UserOne Status Code ***\n', res.statusCode)

    updateUser(testUserTwoId, { name: 'Test UserTwoUpdated', gender: 'Male' })
})

// update a user's details
const updateUser = (id, body) => request.put(
  `http://localhost:3000/api/users/${id}?format=json`,
  {
    body,
    json: true,
  },
  (error, res, body) => {
    console.log('\n*** Update Test UserTwo Response ***\n', body)

    getUsers()
  }
)

// get all users
const getUsers = () => request.get(
  'http://localhost:3000/api/users?format=json',
  (error, res, body) => {
  if (error) {
    return console.dir(error);
  } else  {
    console.log('\n*** Get All Users Response ***')
    console.dir(JSON.parse(body));
    console.log(`result = ${body}`);
  }
})

main()