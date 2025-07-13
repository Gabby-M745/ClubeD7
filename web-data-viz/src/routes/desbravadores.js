var express = require("express");//fixo
var router = express.Router();//fixo

var desbravadorController = require("../controllers/desbravadorController");
/*
router.get("/:empresaId", function (req, res) {
  desbravadorController.buscarAquariosPorEmpresa(req, res);
});*/

router.post("/cadastrar", function (req, res) {
  desbravadorController.cadastrar(req, res);//apenas cadastrar, q ele é apenas um registro
})

module.exports = router;