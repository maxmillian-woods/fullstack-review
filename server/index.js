const express = require('express');
const cors = require('cors');
const github = require('.././helpers/github.js');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var text = Object.keys(req.body).toString();
  github.getReposByUsername(text, (data) => {
    console.log(data);
    res.send(data);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // console.log(req.body)
  var text = Object.keys(req.body).toString();
  github.getReposByUsername(text);
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});