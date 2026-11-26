
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function removerCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);

    salvarCarrinho();
    atualizarCarrinho();
}

function alterarQuantidade(id, quantidade) {
    const item = carrinho.find(item => item.id === id);

    if (!item) return;

    item.quantidade += quantidade;

    if (item.quantidade <= 0) {
        removerCarrinho(id);
        return;
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function calcularTotal() {
    return carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
    );
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const total = document.getElementById("total-carrinho");

    if (!lista || !total) return;

    lista.innerHTML = "";

    carrinho.forEach(item => {
        lista.innerHTML += `
            <div class="item-carrinho">
                <span>${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)}</span>
                <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                <span>${item.quantidade}</span>
                <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                <button onclick="removerCarrinho(${item.id})">
                    Remover
                </button>
            </div>
        `;
    });

    total.textContent = `R$ ${calcularTotal().toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", atualizarCarrinho);
