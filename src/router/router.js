const { Router } = require("express");
const adminRoutes = require("./adminRotas");
const produtoRoutes = require("./produtoRotas");

const router = Router();

router.use("/admin", adminRoutes);
router.use("/produto", produtoRoutes);

module.exports = router;
