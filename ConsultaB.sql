USE Livraria;

SELECT Edicao.cod_isbn AS 'numero_da_edicao',
       Editora.nome AS 'editora',
       Livros.nome AS 'titulo_do_ivro',
       Autores.nome AS 'primeiro_autor'
FROM Edicao
INNER JOIN Livros ON Edicao.e_cod_livro = Livros.cod_livro
INNER JOIN Autores ON Livros.a_cod_autores = Autores.cod_autores
INNER JOIN Editora ON Edicao.e_cod_editora = Editora.cod_editora
WHERE Livros.nome LIKE '%Small%';


