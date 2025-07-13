var usuarioModel = require("../models/usuarioModel");
//var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {//login
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        /*  aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                              .then((resultadoAquarios) => {
                                  if (resultadoAutenticar.length > 0) {*/
                        res.json({ //informações sobre o usuário autenticado.
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                          //  sobrenome: resultadoAutenticar[0].sobrenome,//nome=> sobrenome
                            senha: resultadoAutenticar[0].senha,/*RECOMENDA-SE NÃO TER AQUI A SENHA, O CAMPO, SEGURANÇA PARA O CLIENTE */
                          //  tipo: resultadoAutenticar[0].tipo/*, */
                            // aquarios: resultadoAquarios
                        });
                        /*} else {
                            res.status(204).json({ aquarios: [] });
                        }
                    })*/
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }

            ).catch(//perguntar //capturar qualquer erro que ocorra durante a execução da função usuarioModel.autenticar(email, senha)
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );//"Se ocorrer um erro, a função dentro do catch será executada, permitindo que você registre o erro e envie uma resposta de erro ao cliente."
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;//mantém
    var nome = req.body.nomeServer;//mantém
    var sobrenome = req.body.sobrenomeServer;
    var tipo = req.body.tipoServer;//mantém /*select option  */
   var senha = req.body.senhaServer;//mantém  

  /*  var fkUnidade = req.body.idUnidadeVincularServer;
 if(!email.includes("@") && !email.includes(".")){//validação para ver se o email corresponde a ser um email
    alert("Seu email não corresponde a email, deve conter '@' e '.' ");

 }
 if(senha.length <5){
    alert("Sua senha deve conter mais que 5 digitos ");

 }
    SER NO HTML*/
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("Seu tipo está undefined!");//usuario
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");

    } else if (fkUnidade == undefined) {
        res.status(400).send("Sua unidade a vincular está undefined!");//unidade
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        /*vá primeiro no moder do usuario, aqui vc retorna dps que alterar/atualizar lá*/
        /*dps de adionar o campo sobrenome, volte aqui e atualize, é comum errar ou esquecer de voltar aqui, então atenção!! */
        usuarioModel.cadastrar(nome, sobrenome, email, tipo, senha, fkUnidade)
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
    autenticar,
    cadastrar
}