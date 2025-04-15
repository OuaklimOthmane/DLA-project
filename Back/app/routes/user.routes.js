module.exports = (app) => {
  console.log("im in routes");
  const userController = require("../controllers/users.controller.js");
  const { isAdmin } = require("../helpers/middleware/isAdmin.js");
  const {
    verificationToken,
  } = require("../helpers/middleware/verificationToken");
  var router = require("express").Router();

  // Create a new user Member
  router.post("/", isAdmin, userController.create);

  // Create a new user admin
  router.post("/admin", userController.createAdmine);

  // Update member
  router.put("/:id", verificationToken, userController.update);

  // get All  member
  router.get("/", isAdmin, userController.findAllMembers);

  // Delete a Tutorial with id
  router.delete("/:id", verificationToken, userController.deleteMember);

  router.get("/data_user", verificationToken, userController.getUserLogin);

  app.use("/api/user", router);
};
