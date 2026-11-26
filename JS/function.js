// Lista de produtos do restaurante
let produtos = [
    { nome: "Paillard de filet", preco: 68.00 },
    { nome: "Risoto de camarão", preco: 48.00 },
    { nome: "Steak tartare", preco: 82.00 },
    
];

let sobremesas = [
    { nome: "Cheesecake", preco: 62.00},
    { nome: "Petit Gâteau", preco: 47.00},
    { nome: "Créme brúlêe", preco: 39.00},
]
// Carrinho de compras
let carrinho = [];

// Total do pedido
let totalPedido = 0;

// Adicionar produto ao carrinho
function adicionarCarrinho(nomeProduto) {
    let produto = produtos.find(item => item.nome === nomeProduto);

    if (!produto) {
        console.log("Produto não encontrado!");
        return;
    }

    carrinho.push({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1
    });

    console.log(nomeProduto + "adicionado ao carrinho!");
}
