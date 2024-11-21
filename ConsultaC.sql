USE Livraria;

SELECT Edicao.cod_isbn AS numero_da_edicao, Editora.nome AS nome_editora, Livros.nome AS titulo_livro
FROM Autores
JOIN Livros ON Autores.cod_autores = Livros.a_cod_autores
JOIN Edicao ON Livros.cod_livro = Edicao.e_cod_livro
JOIN Editora ON Edicao.e_cod_editora = Editora.cod_editora
WHERE Autores.nome LIKE '%Joseph Terry Sr.%';
