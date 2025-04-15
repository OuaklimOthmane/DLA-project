const productRepository = require("../repository/products.repository");

// create
exports.create = async (user) => {
  const store = await productRepository.create(user);
  if (!store) return { name: "ERROR_STORE_PRODUCT" };
  return { name: "DONE", data: store };
};

// Retrieve all PRODUCTS from the database.
exports.findAll = async (condition) => {
  const mycondition = condition;
  const getall = await productRepository.findAll(mycondition);
  if (!getall) return { nama: "ERROR_FIND_ALL_PRODUCTS" };
  return { name: "DONE", data: getall };
};

// findOne
exports.findOne = async (id) => {
  const user = await productRepository.findOne(id);
  if (!user) return { nama: "ERROR_FIND_PRODUCTS" };
  return { name: "DONE", data: user };
};

// Update a user
exports.update = async (user, payload, id) => {
  let findProduct;
  if (user.role_id == 1) {
    findProduct = await productRepository.findOne({
      id: id,
    });
  } else {
    findProduct = await productRepository.findOne({
      id: id,
      user_id: user.id,
    });
  }
  if (!findProduct) return { name: "PRODUCT_NOT_FOUND" };
  const edite = await productRepository.update(payload, findProduct.id);
  if (!edite) return { nama: "ERROR_FIND_PRODUCTS" };
  return { name: "DONE", data: edite };
};

// Delete a user
exports.delete = async (user, id) => {
  console.log("user for delete", user);
  const findProduct = await productRepository.findOne({ id: id });
  if (!findProduct) return { name: "PRODUCT_NOT_FOUND" };
  if (user.role_id == 2 && user.id != findProduct.user_id)
    return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  const deleteUser = await productRepository.delete(id);
  if (!deleteUser) return { nama: "ERROR_DELETE_USER" };
  return { name: "DONE", data: deleteUser };
};

// finduser
exports.findAll = async (condition) => {
  const mycondition = condition;
  const getall = await productRepository.findAll(mycondition);
  if (!getall) return { nama: "ERROR_FIND_ALL_PRODUCTS" };
  return { name: "DONE", data: getall };
};

// Delete all PRODUCTS from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} PRODUCTS were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all PRODUCTS.",
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
//           err.message || "Some error occurred while retrieving PRODUCTS.",
//       });
//     });
// };
