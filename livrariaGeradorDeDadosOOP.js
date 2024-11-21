const { faker, fakerPT_BR } = require('@faker-js/faker');
require('dotenv').config();
const mysql = require('mysql2');

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
// Conectar ao banco de dados

//teste
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar: ', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados!');
});

// Dados a serem inseridos

function getFormattedBirthdate() {
  const birthdate = faker.date.past({years: 20});
  return birthdate.toLocaleDateString();
}

function generateLanguage() {
    const linguas = ['Português', 'Espanhol', 'Inglês', 'Alemão', 'Francês'];
    return faker.helpers.arrayElement(linguas);
}

function geradorDeNomesLivros() {
    return faker.commerce.productName();
}

function geradorDeNomes() {
    return faker.person.fullName();
}

function geradorCodAutores() {
    const cautores = [];
    const usedCodes = {}; 

    
    for (let i = 0; i < 100; i++) {
        let uniqueCode;
        do {
            uniqueCode = faker.number.int({ min: 100000, max: 999999 }).toString();
        } while (usedCodes[uniqueCode]); 
        usedCodes[uniqueCode] = true; 
        const nome = geradorDeNomes();
        cautores.push({ nome: nome, codigo: uniqueCode.toString() }); 
    }

    const autorAleatorio = faker.helpers.arrayElement(cautores);
    
    return `${autorAleatorio.codigo}`;
}



function geradorCodEditora() {
    const cautores = [];
    const usedCodes = {}; 

    
    for (let i = 0; i < 50; i++) {
        let uniqueCode;
        do {
            uniqueCode = faker.number.int({ min: 10000, max: 99999 }).toString();
        } while (usedCodes[uniqueCode]); 
        usedCodes[uniqueCode] = true; 
        const nome = geradorDeNomes();
        cautores.push({ nome: nome, codigo: uniqueCode.toString() }); 
    }

    const editoraAleatorio = faker.helpers.arrayElement(cautores);

    return `${editoraAleatorio.codigo}`;
}

function geradorCodLivros() {
    const clivros = [];
    const usedCodes = {}; 

    
    for (let i = 0; i < 400; i++) {
        let uniqueCode;
        do {
            uniqueCode = faker.number.int({ min: 100000, max: 999999 }).toString();
        } while (usedCodes[uniqueCode]); 
        usedCodes[uniqueCode] = true; 
        const nome = geradorDeNomes();
        clivros.push({ nome: nome, codigo: uniqueCode.toString() }); 
    }

    const livroAleatorio = faker.helpers.arrayElement(clivros);
    
    return `${livroAleatorio.codigo}`;
}

function armazenaCodigoAutor(codigo) {
    if (!this.codigosAutores) {
        this.codigosAutores = [];
    }
    this.codigosAutores.push(codigo);
}

function sortearCodigoAutor() {
    if (!this.codigosAutores || this.codigosAutores.length === 0) {
        return null; 
    }
    const indiceSorteado = Math.floor(Math.random() * this.codigosAutores.length);
    return this.codigosAutores[indiceSorteado];
}

function armazenaCodigoLivro(codigo) {
    if (!this.codigosLivros) {
        this.codigosLivros = [];
    }
    this.codigosLivros.push(codigo);
}

function sortearCodigoLivro() {
    if (!this.codigosLivros || this.codigosLivros.length === 0) {
        return null; 
    }
    const indiceSorteado = Math.floor(Math.random() * this.codigosLivros.length);
    return this.codigosLivros[indiceSorteado];
}

function armazenaCodigoEditora(codigo) {
    if (!this.codigosEditoras) {
        this.codigosEditoras = [];
    }
    this.codigosEditoras.push(codigo);
}

function sortearCodigoEditora() {
    if (!this.codigosEditoras || this.codigosEditoras.length === 0) {
        return null; 
    }
    const indiceSorteado = Math.floor(Math.random() * this.codigosEditoras.length);
    return this.codigosEditoras[indiceSorteado];
}


class Autor {
    constructor(codigoAutor, nomeCompleto, aniversario, paisNascimento, biografia) {   
        this.codigoAutor = codigoAutor;
        armazenaCodigoAutor(this.codigoAutor);
        this.nomeCompleto = nomeCompleto;
        this.aniversario = aniversario;
        this.paisNascimento = paisNascimento;
        this.biografia = biografia;
    }
    
    gerarDados() {
        return [
            this.codigoAutor,
            this.nomeCompleto,
            this.aniversario,
            this.paisNascimento,
            this.biografia
        ];
    }
}

const autores=[];

for (let i = 0; i < 100; i++) {
    const codigoAutor = geradorCodAutores();
    const nomeCompleto = geradorDeNomes();
    const aniversario = getFormattedBirthdate();
    const paisNascimento = faker.location.country();
    const biografia = fakerPT_BR.lorem.paragraph(1);

    const autor = new Autor(codigoAutor, nomeCompleto, aniversario, paisNascimento, biografia);
    autores.push(autor); 
}

class Livro {
    constructor(codigoLivro, nomeLivro, lingua, anoDoLivro, codAutor) {
        this.codigoLivro = codigoLivro;
        armazenaCodigoLivro(this.codigoLivro); 
        this.livroNome = nomeLivro;
        this.linguaL = lingua;
        this.anoLivro = anoDoLivro;
        this.FcodAutor = codAutor; 
    }

    gerarDados() {
        return [
            this.codigoLivro,
            this.livroNome,
            this.linguaL,
            this.anoLivro,
            this.FcodAutor
        ];
    }
}
const livros = [];
for(let i=0; i<400; i++){
    const codigoLivro = geradorCodLivros();
    const nomeLivro = geradorDeNomesLivros();
    const lingua = generateLanguage();
    const anoDoLivro = faker.number.int({ min: 1950, max: 2024 });
    const codAutor = sortearCodigoAutor();;
    const livro = new Livro(codigoLivro, nomeLivro, lingua, anoDoLivro, codAutor);
    livros.push(livro);
}

class Editora {
    constructor(codigoEditora, nomeEditora, endereco, numeroTelefone, codLivro) {
        this.codigoEditora = codigoEditora
        armazenaCodigoEditora(this.codigoEditora); 
        this.nomeEditora = nomeEditora;
        this.endereco = endereco;
        this.numeroTelefone = numeroTelefone;
        this.FcodLivro = codLivro; 
    }

    gerarDados() {
        return [
            this.codigoEditora,
            this.nomeEditora,
            this.endereco,
            this.numeroTelefone,
            this.FcodLivro
        ];
    }
}
const editoras = [];
for(let i=0; i<50; i++){
    const codigoEditora = geradorCodEditora();
    const nomeEditora = faker.company.name();
    const endereco = fakerPT_BR.location.streetAddress();
    const numeroTelefone = faker.number.int({ min: 100000000, max: 999999999 }).toString();
    const codLivro= sortearCodigoLivro();
    const editora = new Editora(codigoEditora, nomeEditora, endereco, numeroTelefone, codLivro);
    editoras.push(editora);
}

class Edicao {
    constructor(codigoIsbn, precoE, anoEdicao, numeroPaginas, quantEstoque, codLivro, codEditora){
        this.isbnLivro = codigoIsbn;
        this.precoE = precoE;
        this.anoEdicao = anoEdicao;
        this.numPaginas = numeroPaginas;
        this.quant_estoqueE = quantEstoque;
        this.FEcodLivro = codLivro; 
        this.FEcodEditora = codEditora; 
    }

    gerarDados() {
        return [
            this.isbnLivro,
            this.precoE,
            this.anoEdicao,
            this.numPaginas,
            this.quant_estoqueE,
            this.FEcodLivro,
            this.FEcodEditora
        ];
    }
}

const edicoes =[];

for(let i=0; i<1000; i++){
    const codigoIsbn = faker.commerce.isbn(9).toString();
    const precoE = faker.commerce.price({ min: 0, max: 200 });
    const anoEdicao = faker.number.int({ min: 1950, max: 2024 });
    const numeroPaginas = faker.number.int({ min: 100, max: 500 });
    const quantEstoque = faker.number.int({ min: 0, max: 200 });
    const codLivro = sortearCodigoLivro();
    const codEditora = sortearCodigoEditora();
    const edicao = new Edicao(codigoIsbn, precoE, anoEdicao, numeroPaginas, quantEstoque, codLivro, codEditora);
    edicoes.push(edicao);
}


// Obter dados e inserir no banco de dados
const dadosAutores = autores.map(autor => autor.gerarDados());
const dadosLivros = livros.map(livro => livro.gerarDados());
const dadosEditoras = editoras.map(editora => editora.gerarDados());
const dadosEdicoes = edicoes.map(edicao => edicao.gerarDados());



// Função para inserir dados no banco de dados
function inserirDados(sql, dados, mensagemSucesso, mensagemErro) {
    connection.query(sql, [dados], (err, result) => {
        if (err) {
            console.error(mensagemErro, err);
            return;
        }
        console.log(mensagemSucesso);
    });
}


const sqlAutores = 'INSERT INTO Autores (cod_autores, nome, dt_nascimento, pais_nascimento, bio) VALUES ?';
inserirDados(sqlAutores, dadosAutores, 'Dados de autores inseridos com sucesso!', 'Erro ao inserir dados Autores:');


const sqlLivros = 'INSERT INTO Livros (cod_livro, nome, lingua, ano, a_cod_autores) VALUES ?';
inserirDados(sqlLivros, dadosLivros, 'Dados de livros inseridos com sucesso!', 'Erro ao inserir dados Livros:');


const sqlEditora = 'INSERT INTO Editora (cod_editora, nome, endereco, telefone, l_cod_livro) VALUES ?';
inserirDados(sqlEditora, dadosEditoras, 'Dados de editora inseridos com sucesso!', 'Erro ao inserir dados Editora:');


const sqlEdicao = 'INSERT INTO Edicao (cod_isbn, preco, ano, num_de_paginas, quant_estoque, e_cod_livro, e_cod_editora) VALUES ?';
inserirDados(sqlEdicao, dadosEdicoes, 'Dados de edição inseridos com sucesso!', 'Erro ao inserir dados Edicao:');


connection.end();
