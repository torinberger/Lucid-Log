const database = require('../database');

const findUserQuery = 'SELECT * FROM users WHERE username = $1 AND password = $2';

exports.findUser = function findUser(username, password) {
  return new Promise((resolve, reject) => {
    database.query(findUserQuery, [
      username,
      password,
    ], (err, res) => {
      if (res) {
        resolve(res.rows);
      } else {
        reject(err);
      }
    });
  });
};
