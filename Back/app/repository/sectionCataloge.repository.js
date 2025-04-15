const db = require("../models");
const sectionCataloge = db.sectionCataloge;
const Op = db.Sequelize.Op;

// create
exports.create = async (payload) => {
  try {
    console.log("section catalog", payload);
    return await sectionCataloge.create(payload);
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Retrieve all sectionCataloge from the database.
exports.findAll = async (condition) => {
  try {
    return await sectionCataloge.findAll({ where: condition, raw: true });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// findOne
exports.findOne = async (condition) => {
  try {
    return await sectionCataloge.findOne({ where: condition });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Update a sectionCataloge
exports.update = async (payload, id) => {
  try {
    return await sectionCataloge.update(payload, {
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Delete a sectionCataloge
exports.delete = async (id) => {
  try {
    return await sectionCataloge.destroy({
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};
