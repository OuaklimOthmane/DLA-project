module.exports = (app) => {
  const subSectionCatalogeController = require("../controllers/subSectionCataloge.controller");
  const {
    verificationToken,
  } = require("../helpers/middleware/verificationToken");

  var router = require("express").Router();

  // // get all cataloge
  // router.get("/", verificationToken, subSectionCatalogeController.getAll);

  // // Create a new cataloge
  // router.get(
  //   "/by-member",
  //   verificationToken,
  //   subSectionCatalogeController.getByMember
  // );

  // Create a new cataloge
  router.post("/", verificationToken, subSectionCatalogeController.create);

  // Update cataloge
  router.put("/:id", verificationToken, subSectionCatalogeController.update);

  // Delete a cataloge with id
  router.delete("/:id", verificationToken, subSectionCatalogeController.delete);

  // // show one  cataloge
  router.get("/:id", verificationToken, subSectionCatalogeController.show);

  app.use("/api/subsection-cataloge", router);
};
