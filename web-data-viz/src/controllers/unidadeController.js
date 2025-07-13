var unidadeModel = require("../models/unidadeModel");
/*
function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  unidadeModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}
*/
function listar(req, res) {
  unidadeModel.listar().then((resultado) => {//Lista todas as unidades da tabela unidade.

    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  unidadeModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var nome = req.body.unidadeServer;//VARIAÁVEL DO FETCH
   // var clube = req.body.clubeServer;//VARIAÁVEL DO FETCH

 // var razaoSocial = req.body.razaoSocial;

 unidadeModel.buscarPorNome(nome).then((resultado) => {// ativa a cor de cima da dvariavel quando preenchido aqui
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a unidade com o nome ${nome} já existe` });
    } else {
     unidadeModel.cadastrar(nome).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
 /* buscarPorCnpj,*/
  cadastrar,
  buscarPorId,
  listar,
};
