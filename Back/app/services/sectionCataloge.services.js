const sectionCatalogeRepository = require("../repository/sectionCataloge.repository");

// create
exports.create = async (data) => {
  const store = await sectionCatalogeRepository.create(data);
  if (!store) return { name: "ERROR_STORE_SECTION_CATALOGE" };
  return { name: "DONE", data: store };
};

// Retrieve all SECTION_CATALOGE from the database.
exports.findAll = async (condition) => {
  const mycondition = condition;
  const getall = await sectionCatalogeRepository.findAll(mycondition);
  if (!getall) return { nama: "ERROR_FIND_ALL_SECTION_CATALOGE" };
  return { name: "DONE", data: getall };
};

// findOne
exports.findOne = async (id) => {
  const sectionCatalog = await sectionCatalogeRepository.findOne(id);
  if (!sectionCatalog) return { nama: "ERROR_FIND_SECTION_CATALOGE" };
  return { name: "DONE", data: user };
};

// Update a section
exports.update = async (user, payload, id) => {
  const findSectionCataloge = await sectionCatalogeRepository.findOne({
    id: id,
  });
  if (!findSectionCataloge) return { name: "SECTION_CATALOGE_NOT_FOUND" };
  // if (user.role_id == 2 && user.id != findSectionCataloge.user_id)
  //   return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  const edite = await sectionCatalogeRepository.update(
    payload,
    findSectionCataloge.id
  );
  if (!edite) return { nama: "ERROR_EDITE_SECTION_CATALOGE" };
  return { name: "DONE", data: edite };
};

// Delete a user
exports.delete = async (user, id) => {
  const findSectionCataloge = await sectionCatalogeRepository.findOne({
    id: id,
  });
  if (!findSectionCataloge) return { name: "SECTION_CATALOGE_NOT_FOUND" };
  const deleteSectionCataloge = await sectionCatalogeRepository.delete(id);
  if (!deleteSectionCataloge) return { nama: "ERROR_DELETE_SECTION_CATALOGE" };
  return { name: "DONE", data: deleteSectionCataloge };
};

// Show a cataloge
exports.show = async (user, id) => {
  const findSectionCataloge = await sectionCatalogeRepository.findOne({
    id: id,
  });
  if (!findSectionCataloge) return { name: "SECTION_CATALOGE_NOT_FOUND" };
  // if (user.role_id == 2 && user.id != findSectionCataloge.user_id)
  //   return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  return { name: "DONE", data: findSectionCataloge };
};
