const sha256 = require('crypto-js/sha256');

const tokenTimeout = 1000 * 60 * 60; // 1 hour

module.exports = function exports() {
  this.tokens = [];

  this.addToken = function addToken(token, username, password) {
    const id = Math.random();

    for (let i = 0; i < this.tokens.length; i += 1) {
      if (this.tokens[i].username === username) {
        console.log(`DELETE AUTH TOKEN ${this.tokens[i].token} ( ${this.tokens[i].username} )`);
        this.tokens.splice(i, 1);
      }
    }

    this.tokens.push({
      id,
      token,
      username,
      password,
    });

    console.log(`NEW AUTH TOKEN ${token} ( ${username} )`);

    setTimeout(() => {
      for (let i = 0; i < this.tokens.length; i += 1) {
        if (this.tokens[i].id === id) {
          console.log(`DELETE AUTH TOKEN ${this.tokens[i].token} ( ${this.tokens[i].username} )`);
          this.tokens.splice(i, 1); // remove token from list
        }
      }
    }, tokenTimeout); // wait one hour
  };

  this.getTokens = function getTokens() {
    return this.tokens;
  };

  this.getUserByToken = function getUserByToken(token) {
    for (let i = 0; i < this.tokens.length; i += 1) {
      if (this.tokens[i].token === token) {
        return {
          username: this.tokens[i].username,
          password: this.tokens[i].password,
        };
      }
    }

    return false;
  };

  this.hasToken = function hasToken(token) {
    for (let i = 0; i < this.tokens.length; i += 1) {
      if (this.tokens[i] === token) {
        return true;
      }
    }

    return false;
  };

  this.genToken = function genToken(username, password) {
    return String(sha256(JSON.stringify({
      username,
      password,
    })));
  };
};
