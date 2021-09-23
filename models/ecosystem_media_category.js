"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ecosystem_media_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ecosystem_media_category.init(
    {
      category_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ecosystem_media_category",
      underscored: true,
    }
  );
  return ecosystem_media_category;
};
