const { Router } = require("express");
const adminRoutes = require("./adminRotas");
const produtoRoutes = require("./produtoRotas");
const pedidoRoutes = require("./pedidoRotas");

const router = Router();

router.use("/admin", adminRoutes);
router.use("/produto", produtoRoutes);
router.use("/pedido", pedidoRoutes);
module.exports = router;
