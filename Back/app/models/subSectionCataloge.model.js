module.exports = (sequelize, Sequelize) => {
  const subSectionCataloge = sequelize.define("sub_section_cataloge", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(255),
    },
  });

  return subSectionCataloge;
};
