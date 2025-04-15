const productGroupeRepository = require("../repository/productGroupe.repository");

// create
exports.create = async (data) => {
  const store = await productGroupeRepository.create(data);
  if (!store) return { name: "ERROR_STORE_PRODUCT_GROUPE" };
  return { name: "DONE", data: store };
};

// Retrieve all PRODUCT_GROUPE from the database.
exports.findAll = async (condition) => {
  const mycondition = condition;
  const getall = await productGroupeRepository.findAll(mycondition);
  if (!getall) return { nama: "ERROR_FIND_ALL_PRODUCT_GROUPE" };
  return { name: "DONE", data: getall };
};

// findOne
exports.findOne = async (id) => {
  const sectionCatalog = await productGroupeRepository.findOne(id);
  if (!sectionCatalog) return { nama: "ERROR_FIND_PRODUCT_GROUPE" };
  return { name: "DONE", data: user };
};

// Update a section
exports.update = async (user, payload, id) => {
  const findSectionCataloge = await productGroupeRepository.findOne({
    id: id,
  });
  if (!findSectionCataloge) return { name: "PRODUCT_GROUPE_NOT_FOUND" };
  // if (user.role_id == 2 && user.id != findSectionCataloge.user_id)
  //   return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  const edite = await productGroupeRepository.update(
    payload,
    findSectionCataloge.id
  );
  if (!edite) return { nama: "ERROR_EDITE_PRODUCT_GROUPE" };
  return { name: "DONE", data: edite };
};

// Delete a user
exports.delete = async (user, id) => {
  const findSectionCataloge = await productGroupeRepository.findOne({
    id: id,
  });
  if (!findSectionCataloge) return { name: "PRODUCT_GROUPE_NOT_FOUND" };
  const deleteSectionCataloge = await productGroupeRepository.delete(id);
  if (!deleteSectionCataloge) return { nama: "ERROR_DELETE_PRODUCT_GROUPE" };
  return { name: "DONE", data: deleteSectionCataloge };
};

// Show a cataloge
exports.show = async (user, id) => {
  const findSectionCataloge = await productGroupeRepository.findOne({
    id: id,
  });
  if (!findSectionCataloge) return { name: "PRODUCT_GROUPE_NOT_FOUND" };
  // if (user.role_id == 2 && user.id != findSectionCataloge.user_id)
  //   return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  return { name: "DONE", data: findSectionCataloge };
};
