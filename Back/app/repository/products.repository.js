const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// create
exports.create = async (product) => {
  try {
    console.log("Product", Product);
    console.log("product data", product);

    return await Product.create(product);
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Retrieve all Products from the database.
exports.findAll = async (condition) => {
  try {
    return await Product.findAll({ where: condition });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// findOne
exports.findOne = async (condition) => {
  try {
    return await Product.findOne({ where: condition });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Update a Product
exports.update = async (payload, id) => {
  try {
    return await Product.update(payload, {
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Delete a Product
exports.delete = async (id) => {
  try {
    return await Product.destroy({
      where: { id: id },
    });
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

// Delete all Products from the database.
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
