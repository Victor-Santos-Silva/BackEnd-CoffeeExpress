const pedidoService = require("../services/pedidoService");

const pedidoController = {
  create: async (req, res) => {
    try {
      const pedido = await pedidoService.create(req.body);
      return res.status(200).json({
        msg: "Pedido feito com sucesso.",
        pedido,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao tentar criar o pedido.",
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
