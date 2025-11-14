const Carrinho = require("../models/Carrinho");
const Produto = require("../models/Produto");

const carrinhoService = {
  create: async (adminId, produtoId, quantidade, tamanho) => {
    const produto = await Produto.findByPk(produtoId);
    if (!produto) throw new Error("Produto não encontrado.");

    // Define o preço com base no tamanho escolhido
    let precoUnitario;
    switch (tamanho) {
      case "P":
        precoUnitario = Number(produto.precoPequeno);
        break;
      case "M":
        precoUnitario = Number(produto.precoMedio);
        break;
      case "G":
        precoUnitario = Number(produto.precoGrande);
        break;
      default:
        throw new Error("Tamanho inválido.");
    }

    const precoTotal = precoUnitario * quantidade;

    // Busca o item pelo tamanho também
    let item = await Carrinho.findOne({
      where: { adminId, produtoId, tamanho },
    });

    if (item) {
      item.quantidade += quantidade;
      item.precoTotal = item.quantidade * precoUnitario;
      await item.save();
    } else {
      item = await Carrinho.create({
        adminId,
        produtoId,
        tamanho,
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
      tamanho: i.tamanho,
      precoUnitario:
        i.tamanho === "P"
          ? Number(i.produto.precoPequeno)
          : i.tamanho === "M"
          ? Number(i.produto.precoMedio)
          : Number(i.produto.precoGrande),
      subtotal: Number(i.precoTotal),
    }));

    const total = items.reduce((acc, item) => acc + item.subtotal, 0);

    return { adminId, items, total };
  },

  deleteItem: async (adminId, produtoId, tamanho) => {
    const item = await Carrinho.findOne({
      where: { adminId, produtoId, tamanho },
    });

    if (!item) throw new Error("Item não encontrado.");

    await item.destroy();
    return { mensagem: "Item removido." };
  },
};

module.exports = carrinhoService;
