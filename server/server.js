const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Login api endpoint
app.post('/login', (req, res) => {
  console.log(req.body);
  res.statusCode = 200;
  //Salt password
  //Check database for correct inputs
  //If not correct inputs, then send an error message
  res.send({ body: "Here is the info" });
});


app.post('/register', (req, res) => {
  console.log(req.body);
  res.statusCode = 200;
  //Salt password
  //Store name, username, and password into database
  //Return some sort of response
  res.send({ body: "Here is the info" });
});