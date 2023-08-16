class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
          cafe: { descricao: 'Café', valor: 3.00 },
          chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
          suco: { descricao: 'Suco Natural', valor: 6.20 },
          sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
          queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
          salgado: { descricao: 'Salgado', valor: 7.25 },
          combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
          combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };
    
        this.formasPagamento = ['dinheiro', 'debito', 'credito'];
      }
    
      calcularValorDaCompra( metodoPagamento, itens) {
        if (!this.formasPagamento.includes(metodoPagamento)) {
          return 'Forma de pagamento inválida!';
        }
    
        let total = 0;
    
        for (const item of itens) {
            // ['cafe,1','chantily,1'] recebimento do input para pegar codigo e quantidade
          const [codigo, quantidade] = item.split(",");

          if (!this.cardapio[codigo]) {
            return 'Item inválido!';
          }
    
          total += this.cardapio[codigo].valor * quantidade;
    
                //chantily ou queijo tem que estar associado a cafe ou sanduiche, respectivamente
          if (codigo == 'chantily' || codigo == 'queijo') {
            const itemPrincipal = codigo == 'chantily' ? 'cafe' : 'sanduiche';
             // split para pegar o código no índice "0" do item principal. Pois os itens são representados pelo pares "codigo, quantidade"
            if (!itens.some(i => i.split(",")[0] == itemPrincipal)) {
              return 'Item extra não pode ser pedido sem o principal';
            }
          }
        }
    
        if (itens.length == 0) {
          return 'Não há itens no carrinho de compra!'; 
        }
    
        if (total == 0) {
          return 'Quantidade inválida!';
        }
    
        if (metodoPagamento == 'dinheiro') {
          total *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (metodoPagamento == 'credito') {
          total *= 1.03; // Aplicar acréscimo de 3% para pagamento a crédito
        }
    
        return "R$ " + total.toFixed(2).toString().replace('.', ',');
      }
    }
export { CaixaDaLanchonete };
