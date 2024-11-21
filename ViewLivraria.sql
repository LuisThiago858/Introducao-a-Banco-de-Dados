CREATE VIEW livros_mais_edicoes_estoque AS
SELECT Editora.nome AS 'nome_da_editora',
       Edicao.cod_isbn AS 'id_da_edicao',
       Livros.nome AS 'titulo_do_Livro',
       Edicao.quant_estoque AS 'quantidade_em_estoque'
FROM Edicao
INNER JOIN Livros ON Edicao.e_cod_livro = Livros.cod_livro
INNER JOIN Editora ON Edicao.e_cod_editora = Editora.cod_editora
WHERE Edicao.quant_estoque = (
    SELECT MAX(quant_estoque)
    FROM Edicao
);
