-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

-- comandos para mysql server
-- drop database aquatech;
CREATE DATABASE aquatech;

USE aquatech;
SHOW TABLES;

-- Tabela USUARIO: responsáveis pelo acesso (conselheiro ou admin)
CREATE TABLE usuario (/*conselheiro que cadastra desbravador*/
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    sobrenome varchar(45) not null,
    email VARCHAR(45) UNIQUE NOT NULL,/*unico*/
    senha VARCHAR(45) NOT NULL,
    tipo VARCHAR(20), /*DEFAULT 'conselheiro',*/
    CONSTRAINT chkTipoUsuario CHECK (tipo IN ('conselheiro', 'admin'))
);

-- Tabela UNIDADE: grupos de desbravadores
CREATE TABLE unidade (
    idUnidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

-- Tabela DESBRAVADOR: pessoas avaliadas
CREATE TABLE desbravador (
    idDesbravador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    sobrenome VARCHAR(45),
    email VARCHAR(45) NOT NULL UNIQUE,
    idade INT,
    fkUnidade INT,
    FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade)
);

-- Tabela CRITERIO: tipos de avaliação
CREATE TABLE criterio (
    idCriterio INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
);

-- Tabela AVALIACAO: avaliações feitas em uma data para um desbravador
CREATE TABLE avaliacao (
    idAvaliacao INT PRIMARY KEY AUTO_INCREMENT,
    registro DATE,
    fkDesbravador INT,
    FOREIGN KEY (fkDesbravador) REFERENCES desbravador(idDesbravador)
);

-- Tabela NOTA: liga avaliacao + criterio + pontuação
CREATE TABLE nota (
    idNota INT PRIMARY KEY AUTO_INCREMENT,
    fkAvaliacao INT,
    fkCriterio INT,
    pontuacao DECIMAL(4,2),
    FOREIGN KEY (fkAvaliacao) REFERENCES avaliacao(idAvaliacao),
    FOREIGN KEY (fkCriterio) REFERENCES criterio(idCriterio)
);

-- INSERTs de exemplo
-- Usuários (responsáveis)
INSERT INTO usuario (nome, email, senha, tipo) VALUES
('Carlos Mendes', 'carlos@email.com', 'senha123', 'admin'),
('Patrícia Souza', 'patricia@email.com', 'senha456', 'conselheiro');

-- Unidades
INSERT INTO unidade (nome) VALUES 
('Falcões Valentes'),
('Águias Reais');

-- Desbravadores
INSERT INTO desbravador (nome, sobrenome, email, idade, fkUnidade) VALUES
('João', 'Silva', 'joao@email.com', 13, 1),
('Maria', 'Souza', 'maria@email.com', 16, 2);

-- Critérios de avaliação
INSERT INTO criterio (nome) VALUES
('Pontualidade'),
('Comportamento'),
('Caderno'),
('Lição Bíblica');

-- Avaliações (registro com data atual)
INSERT INTO avaliacao (fkDesbravador) VALUES
(1),  -- João
(2);  -- Maria

-- Notas para as avaliações
-- João (idAvaliacao = 1)
INSERT INTO nota (fkAvaliacao, fkCriterio, pontuacao) VALUES
(1, 1, 8.5),
(1, 2, 9.0);

-- Maria (idAvaliacao = 2)
INSERT INTO nota (fkAvaliacao, fkCriterio, pontuacao) VALUES
(2, 1, 7.0),
(2, 4, 8.0);

-- Consulta com dedução do tipo de desbravador
SELECT 
    d.idDesbravador,
    d.nome,
    d.sobrenome,
    d.email,
    d.idade,
    CASE 
        WHEN d.idade >= 15 THEN 'diretoria' 
        ELSE 'comum' 
    END AS tipoDesbravador,
    u.nome AS unidade
FROM desbravador d
JOIN unidade u ON d.fkUnidade = u.idUnidade;

-- Consultas gerais
SELECT * FROM usuario;
SELECT * FROM unidade;
SELECT * FROM desbravador;
SELECT * FROM criterio;
SELECT * FROM avaliacao;
SELECT * FROM nota;