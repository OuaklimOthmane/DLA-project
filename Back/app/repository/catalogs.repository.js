const db = require("../models");
const Cataloge = db.catalogs;
const User = db.users;

const Op = db.Sequelize.Op;

// create
exports.create = async (catalog) => {
  try {
    return await Cataloge.create(catalog);
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Retrieve all Cataloge from the database.
exports.findAll = async (condition) => {
  try {
    return await Cataloge.findAll({
      where: condition,
      include: [
        {
          model: User,
          attributes: ["id", "firstname", "lastname", "email"], // Only select the fields you need from the User model
        },
      ],
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// findOne
exports.findOne = async (condition) => {
  try {
    return await Cataloge.findOne({ where: condition });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Update a Cataloge
exports.update = async (payload, id) => {
  try {
    return await Cataloge.update(payload, {
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Delete a Cataloge
exports.delete = async (id) => {
  try {
    return await Cataloge.destroy({
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};
