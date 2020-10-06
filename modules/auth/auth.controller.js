const err = new Error();
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require(path.resolve('./models/index'));
const authHandler = require(path.resolve("./utilities/auth"));
const errorHandler = require(path.resolve('./utilities/errorHandler'));
const User = db.User;


// USER SIGN-IN METHOD
const signIn = async function (req, res) {
  try {
    const field = {
      email: req.body.email
    };
    const user = await User.findBySpecificField(field);
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      err.statusCode = 405;
      err.message = 'Incorrect password!';
      throw err;
    }
    const jwt = await authHandler.generateToken(user);
    return res.status(200).send({
      statusCode: 200,
      token: jwt,
      message: 'Signed in successfully!'
    });
  } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};


// USER REGISTER METHOD
const register = async function (req, res) {
  try {
    const user = await User.register(req);
    if (!user) {
      err.statusCode = 422;
      err.message = 'Unable to register user, Try after sometime!';
      throw err;
    }
    return res.status(201).send({
      statusCode: 201,
      message: 'User registered successfully!'
    });
  } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  } 
};


module.exports = {
  signIn,
  register
};
