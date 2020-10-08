const crypto = require('crypto');

//Method is used to generate random tokens
const randomToken = function () {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = {
  randomToken
};
