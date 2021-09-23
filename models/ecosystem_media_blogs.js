"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ecosystem_media_blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.ecosystem_media_blogs.belongsTo(models.User, {
      //   foreignKey: "createdby",
      // });
      // ecosystem_media_blogs.belongsTo(models.ecosystem_media_category, {
      //   as: "Category",
      //   constraints: false,
      // });
    }
  }
  ecosystem_media_blogs.init(
    {
      title: DataTypes.STRING,
      published_date: DataTypes.STRING,
      image: DataTypes.STRING,
      blog: DataTypes.TEXT,
      author: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ecosystem_media_blogs",
      underscored: true,
    }
  );
  return ecosystem_media_blogs;
};
