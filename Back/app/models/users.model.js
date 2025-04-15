module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: Sequelize.STRING(255),
    },
    lastname: {
      type: Sequelize.STRING(255),
    },
    username: {
      type: Sequelize.STRING(255),
    },
    email: {
      type: Sequelize.STRING(255),
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return users;
};
