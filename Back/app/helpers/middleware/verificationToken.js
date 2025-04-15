const jwt = require("jsonwebtoken");
const { HTTP_UNAUTHORIZED, HTTP_FORBIDDEN } = require("../statusCodes");
const SECRET_TOKE = process.env.SECRET_TOKE;

exports.verificationToken = (req, res, next) => {
  let token = req.query.token || req.headers["authorization"];
  // const token = req.headers.authorization?.split(" ")[1] ?? false; // Authorization: 'Bearer TOKEN'
  const verifiication = token.indexOf("Bearer");
  token = verifiication == 0 ? token.split(" ")[1] : token;
  if (!token) {
    return res.status(HTTP_FORBIDDEN).json({
      error: { message: "A token is required for authentication" },
    });
  }
  try {
    req.user = jwt.verify(token, SECRET_TOKE);
    if (req.user.email === undefined || req.user.email == "") {
      return res
        .status(HTTP_UNAUTHORIZED)
        .json({ error: { message: "Invalid Token req.user" } });
    }
  } catch (err) {
    console.log("err HTTP_UNAUTHORIZED", err);
    return res
      .status(HTTP_UNAUTHORIZED)
      .json({ error: { message: "Invalid Token" } });
  }
  return next();
};
