const Admin = require("../models/admin");
const adminService = require("../services/adminService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const admin = await Admin.findOne({ where: { email } });

      if (!admin) {
        return res.status(400).json({
          msg: "Email ou senha incorretos",
        });
      }

      const isValida = await bcrypt.compare(senha, admin.senha);
      if (!isValida) {
        return res.status(400).json({
          msg: "Email ou senha incorretos",
        });
      }

      const token = jwt.sign(
        { email: admin.email, nome: admin.nome },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        msg: "Login realizado",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },

  esqueciSenha: async (req, res) => {
    const { email, novaSenha } = req.body;
    try {
      const admin = await adminService.esqueciSenha(email, novaSenha);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin não encontrado ou email incorreto",
        });
      }
      return res.status(200).json({
        msg: "Senha do admin foi atualizada com sucesso",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao atualizar o Admin",
      });
    }
  },
  create: async (req, res) => {
    try {
      const admin = await adminService.create(req.body);
      return res.status(201).json({
        msg: "Admin criado com sucesso",
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Erro ao tentar criar o admin",
      });
    }
  },
  update: async (req, res) => {
    try {
      const admin = await adminService.update(req.params.id, req.body);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado",
        });
      }
      return res.status(200).json({
        msg: "Admin atualizado com sucesso",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao atualizar o admin",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const admins = await adminService.getAll();
      return res.status(200).json({
        msg: "Todos os admins!",
        admins,
      });
    } catch (error) {
      return res.status(200).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const admin = await adminService.getById(req.params.id);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado!",
        });
      }
      return res.status(200).json({
        msg: "Admin encontrado",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const admin = await adminService.delete(req.params.id);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin nao encontrado",
        });
      }
      return res.status(200).json({
        msg: "Admin deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },
};

module.exports = adminController;
