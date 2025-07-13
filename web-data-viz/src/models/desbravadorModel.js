var database = require("../database/config");

function buscarDesbravadoresPorUnidade(idUnidade) {

  var instrucaoSql = `SELECT * FROM desbravador WHERE fkUnidade = ${idUnidade}`;


  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome, sobrenome, email, idade, fkUnidade) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, idade, fkUnidade);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    /*o campo cpf=>sobrenome foi adicionado dps de tudo, em alter table, mas se declaro de forma certa no insert, houver a declaração, não haverá problemas em sintaxe, contanto que seja declaro no insert */
 //O que importa é a ordem dos campos no comando, não a ordem física da tabela no banco.

    var instrucaoSql = `
        INSERT INTO desbravador (nome, sobrenome, email, idade, fkUnidade) VALUES ('${nome}','${sobrenome}', '${email}', '${idade}', '${fkUnidade}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
  buscarDesbravadoresPorUnidade,
  cadastrar
}
