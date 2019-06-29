const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: Number,
  name: String,
  repo: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // console.log(JSON.stringify(data));
  var parsed = data;
  for (var i = 0; i < parsed.length; i++) {

    var record = {
      _id: parsed[i].id,
      name: parsed[i].name,
      repo: parsed[i].name,
      forks: parsed[i].forks
    }
    var newMongoRecord = new Repo(record);
    newMongoRecord.save((err, success) => {
      if (err) {
        console.log('duplicate');
      } else {
        console.log('saved');
      }
    });
  }
}

let getTop25 = (callback) => {
  console.log('here');

  Repo.find({}).sort({
    forks: -1
  }).limit(25).exec((err, data) => {
    callback(data);
  });
}

module.exports = {
  save: save,
  getTop25: getTop25
};