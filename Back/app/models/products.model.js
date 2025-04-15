module.exports = (sequelize, Sequelize) => {
  const products = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.STRING(255),
    },
    image: {
      type: Sequelize.STRING(255),
    },
    price: {
      type: Sequelize.DECIMAL,
    },
    refrence: {
      type: Sequelize.STRING(255),
    },
    provider: {
      type: Sequelize.STRING(255),
    },
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  return products;
};
