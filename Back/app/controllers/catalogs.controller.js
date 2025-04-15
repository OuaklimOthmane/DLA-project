const catalogeServices = require("../services/catalogs.services");
const { httpBadRequest, httpOk } = require("../helpers/responses");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Create a user
  const data = {
    title: req.body.title,
    user_id: req.user.id,
    cover: "/uploads/" + req.file.filename,
  };
  const serviceData = await catalogeServices.create(data);
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
    cover: !req?.file ? req.body.image : "/uploads/" + req.file.filename,
  };
  const serviceData = await catalogeServices.update(
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
  const serviceData = await catalogeServices.delete(req.user, req.params.id);
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// getall catalogs
exports.getAll = async (req, res) => {
  const serviceData = await catalogeServices.findAll({});
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// getall catalogs
exports.getByMember = async (req, res) => {
  const serviceData = await catalogeServices.findAll({ user_id: req.user.id });
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// show one  cataloge
exports.show = async (req, res) => {
  const serviceData = await catalogeServices.show(req.user, req.params.id);
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// show all info   cataloge
exports.showWithAllInfo = async (req, res) => {
  const serviceData = await catalogeServices.showWithAllInfo(
    req.user,
    req.params.id
  );
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};
