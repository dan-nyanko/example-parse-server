import async from 'async';

import { getUser } from './services/user';
import { sendTest } from './services/email';

/**
curl -X POST \
-H 'X-Parse-Application-Id: <your appId>' \
-H 'X-Parse-Master-Key: <your masterKey>' \
  -H 'Content-Type: application/json' \
  -d '{"message": "hello"}' http://localhost:1337/parse/functions/echo
*/
Parse.Cloud.define('echo', (req, res) => {
  const message = req.params.message;
  res.success(message);
});

/**
curl -X POST \
  -H 'X-Parse-Application-Id: <your appId>' \
  -H 'X-Parse-Master-Key: <your masterKey>' \
  -H 'Content-Type: application/json' \
  -d '{"email": "a@a.com"}' http://localhost:1337/parse/functions/testEmail
*/
Parse.Cloud.define('testEmail', (request, response) => {
  async.auto({
    user: (cb) => {
      getUser(request.params.email, cb);
    },
    email: ['user', (results, cb) => {
      sendTest(results.user, cb);
    }],
  }, (err, results) => {
    if (err) {
      response.error(err);
      return;
    }
    response.success(results.email);
  });
});
