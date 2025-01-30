const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../config/config.json").jwtSecret;

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    req.status(401).json({ message: "Token não informado" });
  }

  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
