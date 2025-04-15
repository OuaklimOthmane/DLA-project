const subSectionCatalogeRepository = require("../repository/subSectionCataloge.repository");

// create
exports.create = async (data) => {
  const store = await subSectionCatalogeRepository.create(data);
  if (!store) return { name: "ERROR_STORE_SUB_SECTION_CATALOGE" };
  return { name: "DONE", data: store };
};

// Retrieve all SUB_SECTION_CATALOGE from the database.
exports.findAll = async (condition) => {
  const mycondition = condition;
  const getall = await subSectionCatalogeRepository.findAll(mycondition);
  if (!getall) return { nama: "ERROR_FIND_ALL_SUB_SECTION_CATALOGE" };
  return { name: "DONE", data: getall };
};

// findOne
exports.findOne = async (id) => {
  const sectionCatalog = await subSectionCatalogeRepository.findOne(id);
  if (!sectionCatalog) return { nama: "ERROR_FIND_SUB_SECTION_CATALOGE" };
  return { name: "DONE", data: user };
};

// Update a section
exports.update = async (user, payload, id) => {
  const findSubSectionCataloge = await subSectionCatalogeRepository.findOne({
    id: id,
  });
  if (!findSubSectionCataloge)
    return { name: "SUB_SECTION_CATALOGE_NOT_FOUND" };
  // if (user.role_id == 2 && user.id != findSubSectionCataloge.user_id)
  //   return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  const edite = await subSectionCatalogeRepository.update(
    payload,
    findSubSectionCataloge.id
  );
  if (!edite) return { nama: "ERROR_EDITE_SUB_SECTION_CATALOGE" };
  return { name: "DONE", data: edite };
};

// Delete a user
exports.delete = async (user, id) => {
  const findSubSectionCataloge = await subSectionCatalogeRepository.findOne({
    id: id,
  });
  if (!findSubSectionCataloge)
    return { name: "SUB_SECTION_CATALOGE_NOT_FOUND" };
  const deleteSectionCataloge = await subSectionCatalogeRepository.delete(id);
  if (!deleteSectionCataloge)
    return { nama: "ERROR_DELETE_SUB_SECTION_CATALOGE" };
  return { name: "DONE", data: deleteSectionCataloge };
};

// Show a sub section cataloge
exports.show = async (user, id) => {
  const findSubSectionCataloge = await subSectionCatalogeRepository.findOne({
    id: id,
  });
  if (!findSubSectionCataloge)
    return { name: "SUB_SECTION_CATALOGE_NOT_FOUND" };
  // if (user.role_id == 2 && user.id != findSubSectionCataloge.user_id)
  //   return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  return { name: "DONE", data: findSubSectionCataloge };
};
