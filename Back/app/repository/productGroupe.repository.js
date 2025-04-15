const db = require("../models");
const productGroupe = db.productGroupe;
const Op = db.Sequelize.Op;

// create
exports.create = async (payload) => {
  try {
    console.log("payload", payload);
    return await productGroupe.create(payload);
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Retrieve all productGroupe from the database.
exports.findAll = async (condition) => {
  try {
    return await productGroupe.findAll({ where: condition, raw: true });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// findOne
exports.findOne = async (condition) => {
  try {
    return await productGroupe.findOne({ where: condition });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Update a productGroupe
exports.update = async (payload, id) => {
  try {
    return await productGroupe.update(payload, {
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Delete a productGroupe
exports.delete = async (id) => {
  try {
    return await productGroupe.destroy({
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};
