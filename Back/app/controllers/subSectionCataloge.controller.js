const subSectionCatalogeServices = require("../services/subSectionCataloge.services");
const { httpBadRequest, httpOk } = require("../helpers/responses");

// Create and Save a new sub section cataloge
exports.create = async (req, res) => {
  if (!req.body.section_cataloge_id || req.body.section_cataloge_id == "")
    return httpBadRequest(res, "VERIFIDE_DATA");

  const data = {
    title: req.body.title,
    section_cataloge_id: req.body.section_cataloge_id,
  };

  const serviceData = await subSectionCatalogeServices.create(data);
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// update sub section cataloge
exports.update = async (req, res) => {
  const payload = {
    title: req.body.title,
  };
  const serviceData = await subSectionCatalogeServices.update(
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

// delete sub section cataloge
exports.delete = async (req, res) => {
  console.log("req", req.params.id);
  const serviceData = await subSectionCatalogeServices.delete(
    req.user,
    req.params.id
  );
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// getall sub serction cataloge
exports.getAll = async (req, res) => {
  const serviceData = await subSectionCatalogeServices.findAll({});
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// getall sub serction cataloge
exports.getByMember = async (req, res) => {
  const serviceData = await subSectionCatalogeServices.findAll({
    user_id: req.user.id,
  });
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// show one  sub section cataloge
exports.show = async (req, res) => {
  const serviceData = await subSectionCatalogeServices.show(
    req.user,
    req.params.id
  );
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};
