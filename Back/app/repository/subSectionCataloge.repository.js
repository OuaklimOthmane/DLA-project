const db = require("../models");
const subSectionCataloge = db.subSectionCataloge;
const Op = db.Sequelize.Op;

// create
exports.create = async (payload) => {
  try {
    return await subSectionCataloge.create(payload);
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Retrieve all subSectionCataloge from the database.
exports.findAll = async (condition) => {
  try {
    return await subSectionCataloge.findAll({ where: condition, raw: true });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// findOne
exports.findOne = async (condition) => {
  try {
    return await subSectionCataloge.findOne({ where: condition });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Update a subSectionCataloge
exports.update = async (payload, id) => {
  try {
    return await subSectionCataloge.update(payload, {
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Delete a subSectionCataloge
exports.delete = async (id) => {
  try {
    return await subSectionCataloge.destroy({
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};
