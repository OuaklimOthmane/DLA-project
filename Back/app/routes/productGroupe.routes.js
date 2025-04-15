module.exports = (app) => {
  const productGroupeController = require("../controllers/productGroupe.controller");
  const {
    verificationToken,
  } = require("../helpers/middleware/verificationToken");

  var router = require("express").Router();

  // // get all cataloge
  // router.get("/", verificationToken, productGroupeController.getAll);

  // // Create a new cataloge
  // router.get(
  //   "/by-member",
  //   verificationToken,
  //   productGroupeController.getByMember
  // );

  // Create a new cataloge
  router.post("/", verificationToken, productGroupeController.create);

  // Update cataloge
  router.put("/:id", verificationToken, productGroupeController.update);

  // Delete a cataloge with id
  router.delete("/:id", verificationToken, productGroupeController.delete);

  // // show one  cataloge
  // router.get("/:id", verificationToken, productGroupeController.show);

  app.use("/api/product-groupe", router);
};
