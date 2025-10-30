const { Router } = require("express");
const adminController = require("../controller/adminController")
const { validateAdmin, validadeAdminId } = require("../middlewares/validateAdmin")
const router = Router();

//funcao de criar
router.post('/', validateAdmin, adminController.create); 

// funcao de editar
router.put('/:id', validateAdmin, validadeAdminId, adminController.update);

//funçao de esqueci senha
router.put('/:id', validateAdmin, validadeAdminId, adminController.esqueciSenha)

// funcao de deletar
router.delete('/:id', validadeAdminId, adminController.delete); 

// funcao buscar unico
router.get('/:id', validadeAdminId, adminController.getOne); 

//busca todos os admins
router.get('/', adminController.getAll);

// logar
router.post('/login', adminController.login);

//Esqueci Senha
router.post('/esquecisenha', adminController.esqueciSenha);

module.exports = router;