const database = require('../database');

const findUserQuery = 'SELECT * FROM users WHERE username = $1';
const findDaysQuery = 'SELECT * FROM days WHERE userusername = $1';
const findWBTBsQuery = 'SELECT * FROM wbtbs WHERE date = $1';
const findDayQuery = 'SELECT * FROM days WHERE userusername = $1 AND date = $2;';
const updateDayQuery = 'UPDATE days SET techniques = $1, sleeplength = $2 WHERE userusername = $3 AND date = $4;';
const createDay = 'INSERT INTO days(date, userusername, techniques, sleeplength) VALUES($1, $2, $3, $4) RETURNING *';

exports.findUser = function findUser(username) {
  return new Promise((resolve, reject) => {
    database.query(findUserQuery, [
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

exports.findTechniques = function findTechniques(username) {
  return new Promise((resolve, reject) => {
    database.query(findUserQuery, [
      username,
    ], async (userErr, res) => {
      if (userErr) {
        reject(userErr);
      } else {
        const targetUser = res.rows[0];
        const techniques = [];

        await database.query(findDaysQuery, [
          targetUser.username,
        ], async (daysErr, days) => {
          if (daysErr) {
            reject(daysErr);
          } else {
            const promises = [];

            for (let i = 0; i < days.length; i += 1) {
              for (let j = 0; j < days[i].techniques.length; j += 1) {
                if (techniques.indexOf(days[i].techniques[j]) === -1) {
                  techniques.push(days[i].techniques[j]);
                }
              }

              promises.push(database.query(findWBTBsQuery, [
                days[i].date,
              ], async (wbtbsErr, wbtbs) => {
                if (wbtbsErr) {
                  reject(wbtbsErr);
                } else {
                  for (let k = 0; k < wbtbs.length; k += 1) {
                    for (let n = 0; n < wbtbs[k].techniques.length; n += 1) {
                      if (techniques.indexOf(wbtbs[k].techniques[n]) === -1) {
                        techniques.push(wbtbs[k].techniques[n]);
                      }
                    }
                  }
                }
              }));
            }

            Promise.all(promises).then(() => {
              resolve(techniques);
            });
          }
        });
      }
    });
  });
};

exports.findDay = function findDay(username, date) {
  return new Promise((resolve, reject) => {
    database.query(findDayQuery, [
      username,
      date,
    ], async (dayErr, res) => {
      if (dayErr) {
        reject(dayErr);
      } else {
        const targetDay = res.rows[0];

        resolve(targetDay);
      }
    });
  });
};

exports.updateDay = function updateDay(techniques, sleepLength, username, date) {
  return new Promise((resolve, reject) => {
    database.query(findDayQuery, [
      username,
      date,
    ], (findErr, findRes) => {
      if (findErr) {
        reject(findErr);
      } else {
        const target = findRes.rows[0];

        if (target) {
          database.query(updateDayQuery, [
            techniques,
            sleepLength,
            username,
            date,
          ], (err, res) => {
            if (res) {
              resolve(res.rows);
            } else {
              reject(err);
            }
          });
        } else {
          database.query(createDay, [
            date,
            username,
            techniques,
            sleepLength,
          ], (err, res) => {
            if (res) {
              resolve(res.rows);
            } else {
              reject(err);
            }
          });
        }
      }
    });
  });
};
