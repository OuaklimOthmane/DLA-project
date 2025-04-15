const {
  HTTP_BAD_REQUEST,
  HTTP_INTERNEL_SERVER_ERROR,
  HTTP_OK,
  HTTP_NO_CONTENT,
  HTTP_CREATED,
  HTTP_NOT_ACCEPTED,
} = require('./statusCodes')


exports.checkResponseStatus = (res) => {
  if (res.ok) {
    return res
  } else {
    throw new Error(
      `The HTTP status of the reponse: ${res.status} (${res.statusText})`
    )
  }
}
/**
 *  Bad Request
 * @param {*} res
 * @param {*} message
 * @returns
 */
exports.httpBadRequest = (res, message) => {
  return res.status(HTTP_BAD_REQUEST).json({
    error: {
      success: false,
      status: HTTP_BAD_REQUEST,
      message,
    },
  })
}
exports.httpInternalServerError = (res, message) => {
  return res.status(HTTP_INTERNEL_SERVER_ERROR).json({
    error: {
      success: false,
      status: HTTP_INTERNEL_SERVER_ERROR,
      message,
    },
  })
}
exports.httpOk = (res, data = undefined) => {
  return res.status(HTTP_OK).json({
    success: true,
    status: HTTP_OK,
    data,
  })
}
exports.httpNoContent = (res, data = undefined, message = undefined) => {
  return res.status(HTTP_NO_CONTENT).json({
    success: true,
    status: HTTP_NO_CONTENT,
    message,
    data,
  })
}
exports.httpCreated = (res, data = undefined, message = undefined) => {
  return res.status(HTTP_CREATED).json({
    success: true,
    status: HTTP_CREATED,
    message,
    data,
  })
}
exports.httpNotAccepted = (res, message, type) => {
  return res.status(HTTP_NOT_ACCEPTED).json({
    error: {
      success: false,
      status: HTTP_NOT_ACCEPTED,
      message,
      type,
    },
  })
}

exports.httpServiceUnavailable = (res, message, type) => {
  return res.status(503).json({
    error: {
      success: false,
      status: 503,
      message,
      type,
    },
  })
}


exports.httpBadGateway = (res, message, type) => {
  return res.status(502).json({
    error: {
      success: false,
      status: 502,
      message,
      type,
    },
  })
}
