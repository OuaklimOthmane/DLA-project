const productGroupeServices = require("../services/productGroupe.services");
const { httpBadRequest, httpOk } = require("../helpers/responses");

// Create and Save a new sub section cataloge
exports.create = async (req, res) => {
  console.log("im here now");
  if (
    !req.body.product_id ||
    req.body.product_id == "" ||
    !req.body.sub_section_cataloge_id ||
    req.body.sub_section_cataloge_id == ""
  )
    return httpBadRequest(res, "verifier les paramètre");

  const data = {
    sub_section_cataloge_id: req.body.sub_section_cataloge_id,
    product_id: req.body.product_id,
    show_price: req.body.show_price,
  };

  const serviceData = await productGroupeServices.create(data);
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// update sub section cataloge
exports.update = async (req, res) => {
  let payload = {
    show_price: req.body.show_price,
    show_provider: req.body.show_provider,
  };
  if (req?.body?.product_id) {
    payload.product_id = req?.body?.product_id;
  }
  const serviceData = await productGroupeServices.update(
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
  const serviceData = await productGroupeServices.delete(
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
  const serviceData = await productGroupeServices.findAll({});
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};

// getall sub serction cataloge
exports.getByMember = async (req, res) => {
  const serviceData = await productGroupeServices.findAll({
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
  const serviceData = await productGroupeServices.show(req.user, req.params.id);
  if (serviceData.name != "DONE") {
    httpBadRequest(res, serviceData.name);
  } else {
    httpOk(res, serviceData.data);
  }
};
