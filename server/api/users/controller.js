const database = require('../database');

const findUserQuery = 'SELECT * FROM users WHERE username = $1';
const findDaysQuery = 'SELECT * FROM days WHERE userID = $1';
const findWBTBsQuery = 'SELECT * FROM wbtbs WHERE dayID = $1';

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
          targetUser.id,
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
                days[i].id,
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
