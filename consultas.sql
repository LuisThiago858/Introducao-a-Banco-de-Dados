FROM Edicao
JOIN Livros ON Edicao.l_cod_livros = Livros.cod_livros
JOIN Editora ON Edicao.e_cod_editora = Editora.cod_editora
JOIN Autores ON Autores.cod_autores = Livros.cod_autores
WHERE Livros.nome LIKE '%XXX%';


SELECT Edicao.cod_isbn, Editora.nome AS editora, Livros.nome AS titulo_livro
FROM Edicao
JOIN Livros ON Edicao.l_cod_livros = Livros.cod_livros
JOIN Editora ON Edicao.e_cod_editora = Editora.cod_editora
JOIN Autores ON Autores.cod_autores = Livros.cod_autores
WHERE Autores.nome LIKE '%XXX%';

UPDATE Edicao
SET quant_estoque = quant_estoque * 1.2

WHERE editora_cod_editora = [ID_DA_EDITORA];


INSERT INTO Edicao (cod_isbn, preco, ano, num_de_paginas, quant_estoque, l_cod_livros, e_cod_editora)
VALUES ([COD_ISBN], [PRECO], [ANO], [NUM_DE_PAGINAS], [QUANT_ESTOQUE], [COD_LIVRO_EXISTENTE], [COD_EDITORA_EXISTENTE]);

CREATE VIEW Livros_Mais_Estocados AS
SELECT Editora.nome AS nome_editora, Edicao.cod_isbn, Livros.nome AS titulo_livro, Edicao.quant_estoque
FROM Edicao
JOIN Livros ON Edicao.l_cod_livros = Livros.cod_livros
JOIN Editora ON Edicao.e_cod_editora = Editora.cod_editora
ORDER BY Edicao.quant_estoque DESC;