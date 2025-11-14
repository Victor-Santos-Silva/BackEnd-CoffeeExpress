const pedidoService = require("../services/pedidoService");

const pedidoController = {
  create: async (req, res) => {
    try {
      const { adminId } = req.body; // pega do body
      if (!adminId) {
        return res.status(400).json({ msg: "adminId é obrigatório" });
      }

      const pedido = await pedidoService.create(adminId);

      return res.status(200).json({
        msg: "Pedido feito com sucesso.",
        pedido,
      });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return res.status(500).json({
        msg: "Erro ao tentar criar o pedido.",
        error: error.message,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const admins = await pedidoService.getAll();
      return res.status(200).json({
        msg: "Todos os pedidos!",
        admins,
      });
    } catch (error) {
      return res.status(200).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },
};

module.exports = pedidoController;
