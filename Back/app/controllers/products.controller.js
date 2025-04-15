const ProductServices = require("../services/products.services");
const { httpBadRequest, httpOk } = require("../helpers/responses");

// Create and Save a product
exports.create = async (req, res) => {
  console.log("  const imagePath = req.file.path  ", req.file);
  console.log("req.body", req.body, req.body.name);
  // Create a product
  const product = {
    name: req.body.name,
    description: req.body.description,
    image: "/uploads/" + req.file.filename,
    price: req.body.price,
    refrence: req.body.refrence,
    provider: req.body.provider,
    stock: req.body.stock,
    user_id: req.user.id,
  };

  console.log("product my ", product);

  const serviceData = await ProductServices.create(product);
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// update user
exports.update = async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    image: !req?.file ? req.body.image : "/uploads/" + req.file.filename,
    price: req.body.price,
    refrence: req.body.refrence,
    provider: req.body.provider,
    stock: req.body.stock,
  };
  const serviceData = await ProductServices.update(
    req.user,
    product,
    req.params.id
  );
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// get all product by member
exports.getProductbyMember = async (req, res) => {
  const serviceData = await ProductServices.findAll({
    user_id: req.user.id,
  });
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

exports.getAllProduct = async (req, res) => {
  const serviceData = await ProductServices.findAll({});
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// delete Member
exports.delete = async (req, res) => {
  const serviceData = await ProductServices.delete(req.user, req.params.id);
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// // Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//   Tutorial.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Tutorial with id=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Tutorial with id=" + id
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Tutorial.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id
//       });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// // find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
