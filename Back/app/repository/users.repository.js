const db = require("../models");
const User = db.users;
const Catalogs = db.catalogs;
const Products = db.products;
const Op = db.Sequelize.Op;

// create
exports.create = async (user) => {
  try {
    return await User.create(user);
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Retrieve all Users from the database.
exports.findAll = async (condition) => {
  try {
    return await User.findAll({
      where: condition,
      include: [Catalogs, Products],
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// findOne
exports.findOne = async (condition) => {
  try {
    return await User.findOne({ where: condition });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Update a user
exports.update = async (payload, id) => {
  try {
    return await User.update(payload, {
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Delete a user
exports.delete = async (id) => {
  try {
    return await User.destroy({
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Users.",
//       });
//     });
// };

// // find all published User
// exports.findAllPublished = (req, res) => {
//   User.findAll({ where: { published: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users.",
//       });
//     });
// };
