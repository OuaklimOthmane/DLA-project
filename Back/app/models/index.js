const dbConfig = require("../config/db.config.js");

// models

// const Users = require("./users.model.js");
// const Roles = require("./roles.model.js");

const Sequelize = require("sequelize");
const config = {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
};
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// const tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
const roles = require("./roles.model.js")(sequelize, Sequelize);
const users = require("./users.model.js")(sequelize, Sequelize);
const products = require("./products.model.js")(sequelize, Sequelize);
const catalogs = require("./catalogs.model.js")(sequelize, Sequelize);
const sectionCataloge = require("./sectionCataloge.model")(
  sequelize,
  Sequelize
);
const subSectionCataloge = require("./subSectionCataloge.model")(
  sequelize,
  Sequelize
);
const productGroupe = require("./productGroupe.model")(sequelize, Sequelize);

// db.tutorials = tutorial;
db.roles = roles;
db.users = users;
db.products = products;
db.catalogs = catalogs;
db.sectionCataloge = sectionCataloge;
db.subSectionCataloge = subSectionCataloge;
db.productGroupe = productGroupe;

// Relationships
roles.hasOne(users, { foreignKey: "role_id" });
products.belongsTo(users, { foreignKey: "user_id" });
users.hasMany(products, { foreignKey: "user_id" });

roles.hasOne(users, { foreignKey: "role_id" });
catalogs.belongsTo(users, { foreignKey: "user_id" });
users.hasMany(catalogs, { foreignKey: "user_id" });

sectionCataloge.belongsTo(catalogs, {
  foreignKey: "cataloge_id",
  allowNull: false,
});

subSectionCataloge.belongsTo(sectionCataloge, {
  foreignKey: "section_cataloge_id",
  allowNull: false,
});
productGroupe.belongsTo(subSectionCataloge, {
  foreignKey: "sub_section_cataloge_id",
  allowNull: false,
});
productGroupe.belongsTo(products, {
  foreignKey: "product_id",
  allowNull: false,
});

module.exports = db;
