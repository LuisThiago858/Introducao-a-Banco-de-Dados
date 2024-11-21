CREATE DATABASE IF NOT EXISTS Livraria;

USE Livraria;

CREATE TABLE IF NOT EXISTS Autores(
	cod_autores VARCHAR(6) PRIMARY KEY,
    nome VARCHAR(40),
    dt_nascimento VARCHAR(15),
    pais_nascimento VARCHAR(100),
    bio VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS Livros(
	cod_livro VARCHAR(6) PRIMARY KEY,
    nome VARCHAR(255),
    lingua VARCHAR(30),
    ano INT,
	a_cod_autores VARCHAR(6),
    FOREIGN KEY Livros(a_cod_autores) REFERENCES Autores(cod_autores)
);

CREATE TABLE IF NOT EXISTS Editora(
	cod_editora VARCHAR(5) PRIMARY KEY,
    nome VARCHAR(50),
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    l_cod_livro VARCHAR(6),
    
    FOREIGN KEY Editora(l_cod_livro) REFERENCES Livros(cod_livro)
    
);

CREATE TABLE IF NOT EXISTS Edicao(
	cod_isbn VARCHAR(20) PRIMARY KEY,
    preco INT,
    ano INT,
    num_de_paginas INT,
    quant_estoque INT,
    e_cod_livro VARCHAR(6),
    e_cod_editora VARCHAR(5),
    FOREIGN KEY(e_cod_livro) REFERENCES Livros(cod_livro),
    FOREIGN KEY(e_cod_editora) REFERENCES Editora(cod_editora)
);