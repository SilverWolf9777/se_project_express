const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { AUTHORIZATION_REQUIRED } = require("../utils/errors");

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(AUTHORIZATION_REQUIRED)
        .send({ message: "Authorization Required" });
    }

    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res
      .status(AUTHORIZATION_REQUIRED)
      .send({ message: "Invalid or expired token" });
  }
};
module.exports = auth;
