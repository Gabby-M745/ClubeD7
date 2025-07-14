var database = require("../database/config")
// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
/*até aqui vc já passou no html, bd, rotas, e uma parte do controller, agora de continuidade ao que é preciso para parametrizar com o bd e retornará e atualizará o controller onde exigiu explicitamente que viesse paracá antes de terminar o controller. */
function cadastrar(nome) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    /*o campo cpf=>sobrenome foi adicionado dps de tudo, em alter table, mas se declaro de forma certa no insert, houver a declaração, não haverá problemas em sintaxe, contanto que seja declaro no insert */
 //O que importa é a ordem dos campos no comando, não a ordem física da tabela no banco.

    var instrucaoSql = `
        INSERT INTO criterio (nome) VALUES ('${nome}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(){
     var instrucaoSql = `
        Select*from criterio;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    listar,
    cadastrar
};