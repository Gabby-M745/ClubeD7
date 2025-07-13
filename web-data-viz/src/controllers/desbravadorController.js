var desbravadorModel = require("../models/desbravadorModel");

function buscarDesbravadoresPorUnidade(req, res) {
  var idUnidade = req.params.idUnidade;

  desbravadorModel.buscarDesbravadoresPorUnidade(idUnidade).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os desbravadores: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;//mantém
    var nome = req.body.nomeServer;//mantém
    var sobrenome = req.body.sobrenomeServer;
   // var unid = req.body.unidServer;//mantém /*select option  */
   var idade = req.body.senhaServer;//mantém  
var fkUnidade = req.body.fkUnidadeServer;


   
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } /*else if (unid == undefined) {
        res.status(400).send("Sua unidade está undefined!");//desbravador
    } */
   else if (idade == undefined) {
        res.status(400).send("Sua idade está undefined!");
    } 
   else if (fkUnidade == undefined) {
        res.status(400).send("Sua unidade a vincular está undefined!");//unidade
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        /*vá primeiro no moder do usuario, aqui vc retorna dps que alterar/atualizar lá*/
        /*dps de adionar o campo sobrenome, volte aqui e atualize, é comum errar ou esquecer de voltar aqui, então atenção!! */
        desbravadorModel.cadastrar(nome, sobrenome, email, idade, fkUnidade)
            .then(//perguntar //se deu certo
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(//se deu errado
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
  buscarDesbravadoresPorUnidade,
//    autenticar,
    cadastrar
}