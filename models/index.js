"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ecosystem_media_blogs = require("./ecosystem_media_blogs")(
  sequelize,
  Sequelize
);
db.ecosystem_media_category = require("./ecosystem_media_category")(
  sequelize,
  Sequelize
);

db.ecosystem_media_category.hasMany(db.ecosystem_media_blogs, {
  foreignKey: "category_id",
  targetKey: "category_id",
  as: "blogs",
});
db.ecosystem_media_blogs.belongsTo(db.ecosystem_media_category, {
  foreignKey: "id",
  targetKey: "id",
  as: "category",
});

// db.ecosystem_media_category.hasMany(db.ecosystem_media_blogs, {
//   foreignKey: "category_id",
// });
// db.ecosystem_media_blogs.belongsTo(db.ecosystem_media_category, {
//   targetKey: "id",
// });

// db.ghana_mentorship_network_categories.hasOne(db.ghana_mentorship_network_blogs);
// db.ghana_mentorship_network_blogs.belongsTo(db.ghana_mentorship_network_categories, {
//   foreignKey: "categoryId",
//   as: "category",
// });

// db.ghana_mentorship_network_categories.hasOne(db.ghana_mentorship_network_books);
// db.ghana_mentorship_network_books.belongsTo(db.ghana_mentorship_network_categories, {
//   foreignKey: "categoryId",
//   as: "category",
// });

module.exports = db;
