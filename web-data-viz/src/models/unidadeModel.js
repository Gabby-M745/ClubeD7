var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM unidade WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM unidade`;//Lista todas as unidades da tabela unidade.

  return database.executar(instrucaoSql);
}

function buscarPorNome(nome) {
  var instrucaoSql = `SELECT * FROM unidade WHERE nome = '${nome}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome) {
  var instrucaoSql = `INSERT INTO unidade (nome) VALUES ('${nome}')`;

  return database.executar(instrucaoSql);
}

//module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
module.exports = {   buscarPorNome,buscarPorId,cadastrar, listar };
