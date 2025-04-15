module.exports = (sequelize, Sequelize) => {
  const productGroupe = sequelize.define("product_groupes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    show_price: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    show_provider: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  return productGroupe;
};
