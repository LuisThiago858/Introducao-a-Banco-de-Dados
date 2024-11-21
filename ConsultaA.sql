USE Livraria;

SELECT DISTINCT Autores.nome
FROM Autores
INNER JOIN Livros ON Autores.cod_autores = Livros.a_cod_autores
INNER JOIN Edicao ON Livros.cod_livro = Edicao.e_cod_livro
INNER JOIN Editora ON Edicao.e_cod_editora = Editora.cod_editora
WHERE Editora.cod_editora = '54506';
