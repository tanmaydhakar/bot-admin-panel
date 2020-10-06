const err = new Error();
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require(path.resolve('./models/index'));
const User = db.User;
const errorHandler = require(path.resolve('./utilities/errorHandler'));

const verifyToken = async function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      err.statusCode = 422;
      err.message = 'Auth Header is missing!';
      throw err;
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      err.statusCode = 403;
      err.message = 'No token provided!';
      throw err;
    }

    const decoded = await jwt.verify(token, process.env.secret);

    if (!decoded) {
      err.statusCode = 403;
      err.message = 'Invalid auth token!';
      throw err;
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      err.statusCode = 403;
      err.message = 'Invalud authentication!';
      throw err;
    }

    const rolesArray = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      rolesArray.push(roles[i].name);
    }

    req.user = user;
    req.user.roles = rolesArray;
    return next();
  } catch (error) {
    const err = errorHandler.getErrorMsg(error);
    return res.status(err.statusCode).send(err);
  }
};

module.exports = {
  verifyToken
};