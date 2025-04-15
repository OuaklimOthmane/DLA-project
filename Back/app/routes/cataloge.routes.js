module.exports = (app) => {
  const catalogeController = require("../controllers/catalogs.controller");
  const {
    verificationToken,
  } = require("../helpers/middleware/verificationToken");
  const { uploadCoverCataloge } = require("../helpers/middleware/upload");

  var router = require("express").Router();

  // get all cataloge
  router.get("/", verificationToken, catalogeController.getAll);

  // Create a new cataloge
  router.get("/by-member", verificationToken, catalogeController.getByMember);

  // Create a new cataloge
  router.post(
    "/",
    verificationToken,
    uploadCoverCataloge,
    catalogeController.create
  );

  // Update cataloge
  router.put(
    "/:id",
    verificationToken,
    uploadCoverCataloge,
    catalogeController.update
  );

  // Delete a cataloge with id
  router.delete("/:id", verificationToken, catalogeController.delete);

  // show all info cataloge
  router.get(
    "/show/:id",
    verificationToken,
    catalogeController.showWithAllInfo
  );

  // show one  cataloge
  router.get("/:id", verificationToken, catalogeController.show);

  app.use("/api/cataloge", router);
};
