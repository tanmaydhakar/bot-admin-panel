'use strict';

let allModels;
const bcrypt = require('bcryptjs');
const Model = require('sequelize').Model;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
    * Method is used for add association with another models
    * @params {Object} models - Object of all models
    * */
    static associate (models) {}
  };
  User.init({
    display_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      set (value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    reset_password_token: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  User.registerModels = function (models) {
    allModels = models;
  };

  User.findBySpecificField = async function (fields) {
    const queryOptions = {
      where: fields
    };
    const user = await User.findOne(queryOptions);
    return user;
  };

  User.register = async function (data) {
    const body = data.body;

    const payload = {
      display_name: `${body.firstName} ${body.lastName}`,
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      password: body.password
    };

    const user = await User.create(payload);
    return user;
  };

  // ALL INSTANCE METHODS
  return User;
};