const express = require("express");
const curtidaController = require("../controller/curtidaController");
const verifyJWT = require("../middleware/auth");

const router = express.Router();

router.get("/:referencia_id", verifyJWT, curtidaController.obterCurtida);

module.exports = router;
