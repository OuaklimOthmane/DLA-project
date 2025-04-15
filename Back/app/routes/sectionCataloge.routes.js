module.exports = (app) => {
  const sectionCatalogeController = require("../controllers/sectionCataloge.controller");
  const {
    verificationToken,
  } = require("../helpers/middleware/verificationToken");

  var router = require("express").Router();

  // // get all cataloge
  // router.get("/", verificationToken, sectionCatalogeController.getAll);

  // // Create a new cataloge
  // router.get(
  //   "/by-member",
  //   verificationToken,
  //   sectionCatalogeController.getByMember
  // );

  // Create a new cataloge
  router.post("/", verificationToken, sectionCatalogeController.create);

  // Update cataloge
  router.put("/:id", verificationToken, sectionCatalogeController.update);

  // Delete a cataloge with id
  router.delete("/:id", verificationToken, sectionCatalogeController.delete);

  // // show one  cataloge
  // router.get("/:id", verificationToken, sectionCatalogeController.show);

  app.use("/api/section-cataloge", router);
};
