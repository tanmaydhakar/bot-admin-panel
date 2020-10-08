const err = new Error();
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require(path.resolve('./models/index'));
const authHandler = require(path.resolve("./utilities/auth"));
const cryptoHandler = require(path.resolve('./utilities/crypto'));
const errorHandler = require(path.resolve('./utilities/errorHandler'));
const mail = require(path.resolve('./utilities/mail'));
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

// USER RESET PASSWORD METHOD
const resetPassword = async function (req, res) {
  try {
    const field = {
      reset_password_token: req.params.token
    };
    const user = await User.findBySpecificField(field);
    user.password = req.body.password;
    user.reset_password_token = null;
    user.save();
    return res.status(202).send({
      statusCode: 202,
      message: 'Your password has been reset successfully!'
    });
  } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};

// USER FORGOT PASSWORD METHOD
const forgotPassword = async function (req, res) {
  try {
    const field = {
      email: req.body.email
    };
    const user = await User.findBySpecificField(field);
    user.reset_password_token = cryptoHandler.randomToken();
    user.save();

    const mailData = {
      to: [user.email],
      displayName: user.display_name,
      subject: 'Botb password reset instructions',
      forgotPasswordToken: user.reset_password_token
    };

    await mail.sendMail(mailData, 'forget');
    return res.status(200).send({
      statusCode: 200,
      message: 'Check your email for reset password instructions'
    });
  } catch (error) {
    const errorResponse = errorHandler.getErrorMsg(error);
    return res.status(errorResponse.statusCode).send(errorResponse);
  }
};


module.exports = {
  signIn,
  register,
  resetPassword,
  forgotPassword
};
