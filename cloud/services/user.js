/**
 * Gets the User from a specified username
 * @param {string} username, username (email address) of the user
 * @param {Function} done, Callback function which returns a Parse.User object or error
 */
export function getUser(username, done) {
  Parse.Cloud.useMasterKey();
  const query = new Parse.Query(Parse.User);
  query.equalTo('username', username);
  query.first(
    (user) => {
      if (user) {
        done(null, user);
        return;
      }
      done('Invalid user');
    },
    (err) => {
      if (err.hasOwnProperty('message')) {
        done(err.message);
        return;
      }
      done(err);
    }
  );
}
