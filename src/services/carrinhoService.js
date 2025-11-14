const Carrinho = require("../models/Carrinho");
const Produto = require("../models/Produto");

const carrinhoService = {
  create: async (adminId, produtoId, quantidade) => {
    const produto = await Produto.findByPk(produtoId);

    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    // Defina o preço que deseja usar
    const precoUnitario = Number(produto.precoPequeno);

    // Calcula total
    const precoTotal = precoUnitario * quantidade;

    // Verifica se o item já existe no carrinho
    let item = await Carrinho.findOne({
      where: { adminId, produtoId },
    });

    if (item) {
      // Atualiza quantidade e total
      item.quantidade += quantidade;
      item.precoTotal = item.quantidade * precoUnitario;
      await item.save();
    } else {
      // Cria novo item
      item = await Carrinho.create({
        adminId,
        produtoId,
        quantidade,
        precoTotal,
      });
    }

    return item;
  },

  getId: async (adminId) => {
    const itens = await Carrinho.findAll({
      where: { adminId },
      include: [{ model: Produto, as: "produto" }],
    });

    if (itens.length === 0) {
      return { mensagem: "Carrinho vazio", items: [], total: 0 };
    }

    const items = itens.map((i) => ({
      produtoId: i.produtoId,
      nome: i.produto.nome,
      quantidade: i.quantidade,
      precoUnitario: Number(i.produto.precoPequeno),
      subtotal: Number(i.precoTotal),
    }));

    const total = items.reduce((acc, item) => acc + item.subtotal, 0);

    return {
      adminId,
      items,
      total,
    };
  },
  deleteItem: async (adminId, produtoId) => {
    const item = await Carrinho.findOne({
      where: { adminId, produtoId },
    });

    if (!item) {
      throw new Error("Item não encontrado no carrinho.");
    }

    await item.destroy();

    return { mensagem: "Item removido do carrinho." };
  },
};

module.exports = carrinhoService;
