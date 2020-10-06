'use strict';

const err = new Error();
const Model = require('sequelize').Model;
const typeEnum = ['Mobile', 'Web'];

module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      });
    }
  };
  Banner.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    link: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(typeEnum),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Banner',
    tableName: 'banner_images',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Banner.upload = async function (data) {
    const body = data.body;

    const payload = {
      link : body.link,
      type : body.type
    }

    const banner = await Banner.create(payload);
    return banner;
  };

  Banner.showBanner = async function(data){
    const userId = data.user.id;

    const queryOptions = {
      where: {
        user_id: userId
      }
    };

    return await Banner.findAll(queryOptions);
  };

  Banner.prototype.patchBanner = async function(data){
    if(data.body.link){
      this.link = data.body.link;
    }
    if(data.body.type){
      this.type = data.body.type;
    }

    return await this.save();
  };

  return Banner;
};