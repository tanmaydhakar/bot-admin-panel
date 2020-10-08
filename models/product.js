'use strict';

const Model = require('sequelize').Model;

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull:false
    }, 
    youtube_link: {
      type: DataTypes.STRING
    }, 
    thumbnail_link: {
      type: DataTypes.STRING
    },
    product_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Product.insertProduct = async function(data){
    const payload = {
      title : data.body.title,
      description : data.body.description,
      created_by : data.user.id,
      updated_by : data.user.id
    }

    if(data.body.youtubeLink){
      payload.youtube_link = data.body.youtubeLink;
    }
    if(data.body.thumbnailLink){
      payload.thumbnail_link = data.body.thumbnailLink;
    }
    if(data.body.productImages){
      payload.product_images = data.body.productImages;
    }

    return await Product.create(payload);
  }

  Product.prototype.patchBanner = async function(data){
    if(data.body.title){
      this.title = data.body.title;
    }
    if(data.body.description){
      this.description = data.body.description;
    }
    if(data.body.youtubeLink){
      this.youtube_link = data.body.youtubeLink;
    }
    if(data.body.thumbnail_link){
      this.thumbnail_link = data.body.thumbnailLink;
    }
    if(data.body.productImages){
      this.product_images = data.body.productImages
    }
    this.updated_by = data.user.id;
    return await this.save();
  };

  return Product;
};