const express = require("express");
const curtidaController = require("../controller/curtidaController");

const router = express.Router();

router.get("/:referencia_id", curtidaController.obterCurtida);

module.exports = router;
