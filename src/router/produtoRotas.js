const { Router } = require("express");
const router = Router();
const produtoController = require("../controller/produtoController.js");
const { validateAdmin } = require("../middlewares/validateAdmin.js");

// funcao de editar
router.put("/:id", validateAdmin, produtoController.update);

// funcao de deletar
router.delete("/:id", validateAdmin, produtoController.delete);

// funcao buscar unico
router.get("/:id", produtoController.getOne);

//busca todos os produtos
router.get("/", produtoController.getAll);

module.exports = router;
