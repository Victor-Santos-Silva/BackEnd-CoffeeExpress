const { Router } = require("express");

const router = Router();

const carrinhoController = require("../controller/carrinhoController");

router.post("/", carrinhoController.create);
router.get("/:adminId", carrinhoController.getId);
router.delete("/:adminId/:produtoId/:tamanho", carrinhoController.deleteItem);

module.exports = router;
