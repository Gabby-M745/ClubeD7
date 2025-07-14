var express = require("express");
var router = express.Router();

var criterioController = require("../controllers/criterioController");

//Recebendo os dados do html e direcionando para a função cadastrar de criterioController.js
router.post("/cadastrar", function (req, res) {
    criterioController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
    criterioController.listar(req, res);
});

module.exports = router;