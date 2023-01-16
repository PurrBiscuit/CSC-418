const request = require("request");

request.get("http://localhost:3000/api/users?format=json", (error, res, body)=> {
  if (error) {
    return console.dir(error);
  } else  {
    console.dir(JSON.parse(body));
    console.log(`result = ${body}`);
  }
})