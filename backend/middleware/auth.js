const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/config.json").jwtSecret;

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Token não informado" });
  }

  const tokenFormatado = token.split(" ")[1];

  jwt.verify(tokenFormatado, jwtSecret.SECRET_KEY, function (err, decoded) {
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
