const database = require('../database');

const findUserQuery = 'SELECT * FROM appuser WHERE username = $1 AND password = $2';
const findUserByUsernameQuery = 'SELECT * FROM appuser WHERE username = $1';
const addUserQuery = 'INSERT INTO appuser(username, password) VALUES($1, $2) RETURNING *';
const deleteUserQuery = 'DELETE FROM appuser WHERE username = $1';

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

exports.findUserByUsername = function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    database.query(findUserByUsernameQuery, [
      username,
    ], (err, res) => {
      if (res) {
        resolve(res.rows);
      } else {
        reject(err);
      }
    });
  });
};

exports.addUser = function addUser(username, password) {
  return new Promise((resolve, reject) => {
    database.query(addUserQuery, [
      username,
      password,
    ], (err, res) => {
      if (res) {
        console.log('CREATE USER');
        resolve(res.rows);
      } else {
        reject(err);
      }
    });
  });
};

exports.deleteUser = function deleteUser(username) {
  return new Promise((resolve, reject) => {
    database.query(deleteUserQuery, [
      username,
    ], (err, res) => {
      if (res) {
        console.log('DELETE USER');
        resolve(res.rows);
      } else {
        reject(err);
      }
    });
  });
};
