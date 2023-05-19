CREATE DATABASE dbNicePlanet;
use dbNicePlanet;

-- Tabela Usuário
CREATE TABLE usuario (
	idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nomeUsuario VARCHAR(255) UNIQUE NOT NULL,
    senhaUsuario VARCHAR(255) NOT NULL
);
INSERT INTO usuario (nomeUsuario, senhaUsuario) VALUE ('teste', '12345');
INSERT INTO usuario (nomeUsuario, senhaUsuario) VALUE ('charmy', '54321'); 
SELECT * FROM usuario;

-- Tabela Produtor
CREATE TABLE produtor (
	idProdutor INT AUTO_INCREMENT PRIMARY KEY,
    nomeProdutor VARCHAR(255) NOT NULL,
    cpfProdutor VARCHAR(11) UNIQUE NOT NULL
);
INSERT INTO produtor (nomeProdutor, cpfProdutor) VALUE ('Charmy Pappitson', '12345678901'); 
INSERT INTO produtor (nomeProdutor, cpfProdutor) VALUE ('Bianca', '12345678902');
SELECT * FROM produtor;

-- Tabela Propriedade
CREATE TABLE propriedade (
	idPropriedade INT AUTO_INCREMENT PRIMARY KEY,
    nomePropriedade VARCHAR(255) NOT NULL,
    cadastroRural INT UNIQUE NOT NULL
);
INSERT INTO propriedade (nomePropriedade, cadastroRural) VALUE ('Touros Negros', 111111); 
INSERT INTO propriedade (nomePropriedade, cadastroRural) VALUE ('Fazenda Boa vida', 222222);
SELECT * FROM propriedade;