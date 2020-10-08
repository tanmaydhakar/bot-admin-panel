'use strict';

const Model = require('sequelize').Model;

const typeEnum = ['Mobile', 'Web'];
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Game.init({
    link: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(typeEnum),
      allowNull: false
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Game',
    tableName: 'games',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Game.uploadGameImage = async function (data, req) {
    const payload = {
      link : data.link,
      type : data.type,
      created_by : req.user.id,
      updated_by : req.user.id
    }

    const banner = await Game.create(payload);
    return banner;
  };


  Game.prototype.patchGameImage = async function(data){
    if(data.body.link){
      this.link = data.body.link;
    }
    if(data.body.type){
      this.type = data.body.type;
    }
    this.updated_by = data.user.id;

    return await this.save();
  };
  return Game;
};