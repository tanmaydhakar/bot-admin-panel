const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authHandler = require(path.resolve("./utilities/auth"));


// USER SIGN-IN METHOD
const signIn = function (req, res) {
  
};


// USER REGISTER METHOD
const register = function (req, res) {
  
};


// USER REGISTER METHOD
const me = function (req, res) {
  
};


module.exports = {
  me,
  signIn,
  register,
};
