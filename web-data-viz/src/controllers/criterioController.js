var criterioModel = require("../models/criterioModel");
//var aquarioModel = require("../models/aquarioModel");

function listar(req, res) {
    criterioModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    //var email = req.body.emailServer;//mantém
    var nome = req.body.nomeServer;//mantém

  
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
   

        // Passe os valores como parâmetro e vá para o arquivo criterioModel.js
        /*vá primeiro no moder do criterio, aqui vc retorna dps que alterar/atualizar lá*/
        /*dps de adionar o campo sobrenome, volte aqui e atualize, é comum errar ou esquecer de voltar aqui, então atenção!! */
        criterioModel.cadastrar(nome)
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
listar,
    cadastrar
}