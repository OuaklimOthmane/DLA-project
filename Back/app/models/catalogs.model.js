module.exports = (sequelize, Sequelize) => {
  const catalogs = sequelize.define("catalogs", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(255),
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return catalogs;
};
