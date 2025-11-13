const { Router } = require("express");

const router = Router();

const pedidoController = require("../controller/pedidoController");

router.get("/", pedidoController.getAll);
router.post("/", pedidoController.create);

module.exports = router;
