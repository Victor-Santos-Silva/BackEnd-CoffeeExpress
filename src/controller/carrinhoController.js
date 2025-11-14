// controllers/carrinhoController.js
const carrinhoService = require("../services/carrinhoService");

const carrinhoController = {
  create: async (req, res) => {
    try {
      const { adminId, produtoId, quantidade } = req.body;

      const item = await carrinhoService.create(adminId, produtoId, quantidade);

      res.status(200).json({
        mensagem: "Produto adicionado ao carrinho",
        item,
      });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  getId: async (req, res) => {
    try {
      const { adminId } = req.params;

      const carrinho = await carrinhoService.getId(adminId);

      return res.status(200).json(carrinho);
    } catch (error) {
      console.log(error);

      return res.status(400).json({ erro: error.message });
    }
  },
  deleteItem: async (req, res) => {
  try {
    const { adminId, produtoId } = req.params;

    const result = await carrinhoService.deleteItem(adminId, produtoId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
},

};

module.exports = carrinhoController;
