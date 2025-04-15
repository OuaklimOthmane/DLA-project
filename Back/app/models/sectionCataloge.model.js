module.exports = (sequelize, Sequelize) => {
  const sectionCataloge = sequelize.define("section_cataloge", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(255),
    },
  });

  return sectionCataloge;
};
