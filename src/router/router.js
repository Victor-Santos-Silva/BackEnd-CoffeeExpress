const { Router } = require("express");
const adminRoutes = require("./adminRotas");
const produtoRoutes = require("./produtoRotas");
const pedidoRoutes = require("./pedidoRotas");
const carrinhoRoutes = require("./carrinhoRotas");

const router = Router();

router.use("/admin", adminRoutes);
router.use("/produto", produtoRoutes);
router.use("/carrinho", carrinhoRoutes);
router.use("/pedido", pedidoRoutes);
module.exports = router;
