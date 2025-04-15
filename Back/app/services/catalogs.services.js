const catalogsRepository = require("../repository/catalogs.repository");
const sectionCatalogeRepository = require("../repository/sectionCataloge.repository");
const subSectionCatalogeRepository = require("../repository/subSectionCataloge.repository");
const productGroupeeRepository = require("../repository/productGroupe.repository");
const productRepository = require("../repository/products.repository");

// create
exports.create = async (data) => {
  const store = await catalogsRepository.create(data);
  if (!store) return { name: "ERROR_STORE_PRODUCT" };
  return { name: "DONE", data: store };
};

// Retrieve all CATALOGS from the database.
exports.findAll = async (condition) => {
  const mycondition = condition;
  const getall = await catalogsRepository.findAll(mycondition);
  if (!getall) return { nama: "ERROR_FIND_ALL_CATALOGS" };
  return { name: "DONE", data: getall };
};

// findOne
exports.findOne = async (id) => {
  const user = await catalogsRepository.findOne(id);
  if (!user) return { nama: "ERROR_FIND_CATALOGS" };
  return { name: "DONE", data: user };
};

// Update a user
exports.update = async (user, payload, id) => {
  const findCataloge = await catalogsRepository.findOne({
    id: id,
  });
  if (!findCataloge) return { name: "CATALOG_NOT_FOUND" };
  if (user.role_id == 2 && user.id != findCataloge.user_id)
    return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  const edite = await catalogsRepository.update(payload, findCataloge.id);
  if (!edite) return { nama: "ERROR_EDITE_CATALOGS" };
  return { name: "DONE", data: edite };
};

// Delete a user
exports.delete = async (user, id) => {
  const findCataloge = await catalogsRepository.findOne({ id: id });
  if (!findCataloge) return { name: "CATALOG_NOT_FOUND" };
  if (user.role_id == 2 && user.id != findCataloge.user_id)
    return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  const deleteUser = await catalogsRepository.delete(id);
  if (!deleteUser) return { nama: "ERROR_DELETE_USER" };
  return { name: "DONE", data: deleteUser };
};

// Show a cataloge
exports.show = async (user, id) => {
  const findCataloge = await catalogsRepository.findOne({ id: id });
  if (!findCataloge) return { name: "CATALOG_NOT_FOUND" };
  if (user.role_id == 2 && user.id != findCataloge.user_id)
    return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  return { name: "DONE", data: findCataloge };
};

// Show a cataloge
exports.showWithAllInfo = async (user, id) => {
  let findCataloge = await catalogsRepository.findOne({ id: id });
  if (!findCataloge) return { name: "CATALOG_NOT_FOUND" };
  let findSectionCataloge = await sectionCatalogeRepository.findAll({
    cataloge_id: findCataloge.id,
  });
  findCataloge = findCataloge.toJSON();
  findCataloge.sectionCataloge = findSectionCataloge;

  for (let sectionCataloge of findCataloge.sectionCataloge) {
    let findSubCataloge = await subSectionCatalogeRepository.findAll({
      section_cataloge_id: sectionCataloge.id,
    });
    sectionCataloge.subSectionCataloge = findSubCataloge;
    for (let subSectionCataloge of sectionCataloge.subSectionCataloge) {
      let findPoductGroup = await productGroupeeRepository.findAll({
        sub_section_cataloge_id: subSectionCataloge.id,
      });
      subSectionCataloge.findPoductGroup = findPoductGroup;

      for (let product of subSectionCataloge.findPoductGroup) {
        let findProduct = await productRepository.findOne({
          id: product.product_id,
        });
        product.product_id = findProduct;
      }
    }
  }
  if (user.role_id == 2 && user.id != findCataloge.user_id)
    return { name: "USER_NOT_ALLOW_TO_THIS_ACTION" };
  return { name: "DONE", data: findCataloge };
};
