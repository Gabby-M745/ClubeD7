var express = require("express"); //fixo//modulos conexões
var router = express.Router();   //fixo// define e faz separação entre as rotas//cria uma nova rota

var unidadeController = require("../controllers/unidadeController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
/*router.post("/cadastrar", function (req, res) {
    unidadeController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    unidadeController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  unidadeController.buscarPorId(req, res);
});
*/
router.get("/listar", function (req, res) {//Ela só lê os dados do banco de dados e os retorna para o navegador ou front-end.
  unidadeController.listar(req, res);
});

module.exports = router;
//UNIDADE