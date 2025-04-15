module.exports = (app) => {
  const productController = require("../controllers/products.controller");
  const {
    verificationToken,
  } = require("../helpers/middleware/verificationToken");
  const { upload } = require("../helpers/middleware/upload");

  var router = require("express").Router();

  // get all products
  router.get("/", verificationToken, productController.getAllProduct);

  // Create a new product
  router.post("/", verificationToken, upload, productController.create);

  // Update product
  router.put("/:id", verificationToken, upload, productController.update);

  // get All  product by member
  router.get(
    "/product-member",
    verificationToken,
    productController.getProductbyMember
  );

  // Delete a product with id
  router.delete("/:id", verificationToken, productController.delete);

  app.use("/api/product", router);
};
