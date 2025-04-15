const sectionCatalogeServices = require("../services/sectionCataloge.services");
const { httpBadRequest, httpOk } = require("../helpers/responses");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Create a user
  console.log("req.body.cataloge_id", req.body.cataloge_id);
  if (!req.body.cataloge_id || req.body.cataloge_id == "")
    return httpBadRequest(res, "VIRIFIDE_DATA");

  const data = {
    title: req.body.title,
    cataloge_id: req.body.cataloge_id,
  };

  const serviceData = await sectionCatalogeServices.create(data);
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// update catalogs
exports.update = async (req, res) => {
  const payload = {
    title: req.body.title,
  };
  const serviceData = await sectionCatalogeServices.update(
    req.user,
    payload,
    req.params.id
  );
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// delete catalogs
exports.delete = async (req, res) => {
  console.log("req", req.params.id);
  const serviceData = await sectionCatalogeServices.delete(
    req.user,
    req.params.id
  );
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// getall catalogs
exports.getAll = async (req, res) => {
  const serviceData = await sectionCatalogeServices.findAll({});
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// getall catalogs
exports.getByMember = async (req, res) => {
  const serviceData = await sectionCatalogeServices.findAll({
    user_id: req.user.id,
  });
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// show one  cataloge
exports.show = async (req, res) => {
  const serviceData = await sectionCatalogeServices.show(
    req.user,
    req.params.id
  );
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};
