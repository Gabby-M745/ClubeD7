-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!
/*
comandos para mysql server
*/
-- drop database aquatech;
CREATE DATABASE aquatech;

USE aquatech;
show tables;

CREATE TABLE unidade (
    idUnidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

-- Tabela DESBRAVADOR: pessoas avaliadas
CREATE TABLE desbravador (
    idDesbravador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    sobrenome VARCHAR(45) ,
    email VARCHAR(45) NOT NULL UNIQUE,
    idade INT ,
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
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkAvaliacao INT,
    fkCriterio INT,
    pontuacao DECIMAL(4,2),
    FOREIGN KEY (fkAvaliacao) REFERENCES avaliacao(idAvaliacao),
    FOREIGN KEY (fkCriterio) REFERENCES criterio(idCriterio)
);

-- INSERTs de exemplo

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

-- Avaliações (registro com data automática)
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

-- Consulta final com tipo de desbravador deduzido
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

select*from desbravador;
select*from avaliacao;
select*from criterio;
select*from nota;
/*select*from usuario;
*/
select*from unidade;
/*describe usuario;*/