module.exports = (sequelize, Sequelize) => {
  const roles = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    lable: {
      type: Sequelize.STRING(255)
    },
  });

  return roles;
};
