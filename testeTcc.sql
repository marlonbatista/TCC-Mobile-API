select carrinho__cod__produto__produtos.nameProduto,carrinho__cod__produto__produtos.quantidade from carrinho inner join carrinho__cod__produto__produtos on carrinho__cod__produto__produtos.postCarrinhoId = carrinho.id  inner join User on carrinho.codUserId = 1;
SELECT * FROM TB_ContratoCotista
INNER JOIN TB_Contrato ON TB_Contrato.id_contrato = TB_ContratoCotista.id_contrato
INNER JOIN TB_Cotista ON TB_Cotista = TB_ContratoCotista.id_cotista