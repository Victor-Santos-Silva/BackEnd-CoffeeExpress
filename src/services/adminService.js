const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

const adminService = {
  create: async (admin) => {
    try {
      const { nome, senha, idade, email } = admin;

      const hashSenha = await bcrypt.hash(senha, 10);

      return await Admin.create({ nome, email, idade, senha: hashSenha });
    } catch (error) {
      console.log(error);
      throw new Error("Ocorreu um erro ao criar Admin");
    }
  },
  esqueciSenha: async (email, novaSenha) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return null;
      }

      if (admin.email !== email) {
        return null;
      }

      const hashSenha = await bcrypt.hash(novaSenha, 10);
      await admin.update({ senha: hashSenha });
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao trocar a senha do Admin");
    }
  },
  update: async (id, adminToUpdate) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        // user for vazio
        return null;
      }
      await admin.update(adminToUpdate);
      await admin.save();
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao atualizar admin");
    }
  },
  getById: async (id) => {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return null;
      }
      return admin;
    } catch (error) {
      throw new Error("Ocorreu um erro ao buscar um unico admin");
    }
  },
  getAll: async () => {
    try {
      return await Admin.findAll();
    } catch (error) {
      throw new Error("Ocorreu um erro ao buscar todos os admins");
    }
  },
  delete: async (id) => {
    try {
      const user = await Admin.findByPk(id);
      if (!user) {
        return null;
      }
      await user.destroy();
      return user;
    } catch (error) {
      throw new Error("Ocorreu um erro ao deletar o admin");
    }
  },
};

module.exports = adminService;
