const request = require('request');
const config = require('../config.js');
const save = require('../database/index.js')

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, (err, res, body) => {
    if (body) {
      jb = JSON.parse(body)
      options_user = {
        method: 'GET',
        url: options.url + '/users/' + username + '/repos',
        headers: {
          accept: 'application/json',
          'User-Agent': 'custom'
        }
      }
      request(options_user, function (err, res, body) {
        if (body) {
          var parsed = JSON.parse(body);
          var resp = [];
          for (var i = 0; i < parsed.length; i++) {
            resp.push({
              id: parsed[i].id,
              name: parsed[i].name,
              user: parsed[i].owner.login,
              forks: parsed[i].forks
            });
          }
          // console.log(JSON.stringify(resp));
          save.save(resp);
          save.getTop25((data) => {
            callback(data);
          });
        } else {
          console.log(err)
        }
      })
    };
  });
}

module.exports.getReposByUsername = getReposByUsername;