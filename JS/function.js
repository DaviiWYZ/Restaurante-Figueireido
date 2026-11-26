// Cardápio e carrinho do Restaurante Figueireido.
// Os dados do carrinho ficam no navegador; senhas nunca são armazenadas aqui.

const produtos = [
    { nome: "Paillard de filet", preco: 68.00 },
    { nome: "Risoto de camarão", preco: 48.00 },
    { nome: "Steak tartare", preco: 82.00 },
    { nome: "Cheesecake", preco: 62.00 },
    { nome: "Petit Gâteau", preco: 47.00 },
    { nome: "Crème brûlée", preco: 39.00 }
];

const CHAVE_CARRINHO = "figueireido-carrinho";

function carregarCarrinho() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

let carrinho = carregarCarrinho();

function salvarCarrinho() {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarMensagem(elemento, texto, erro = false) {
    if (!elemento) return;
    elemento.textContent = texto;
    elemento.classList.toggle("erro", erro);
}

function adicionarCarrinho(nomeProduto) {
    const produto = produtos.find(item => item.nome === nomeProduto);

    if (!produto) {
        mostrarMensagem(document.querySelector("#mensagemCarrinho"), "Produto não encontrado.", true);
        return;
    }

    const itemExistente = carrinho.find(item => item.nome === nomeProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    salvarCarrinho();
    renderizarCarrinho();
    mostrarMensagem(document.querySelector("#mensagemCarrinho"), `${nomeProduto} adicionado ao carrinho.`);
}

function alterarQuantidade(nomeProduto, variacao) {
    const item = carrinho.find(produto => produto.nome === nomeProduto);
    if (!item) return;

    item.quantidade += variacao;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(produto => produto.nome !== nomeProduto);
    }

    salvarCarrinho();
    renderizarCarrinho();
}

function removerDoCarrinho(nomeProduto) {
    carrinho = carrinho.filter(item => item.nome !== nomeProduto);
    salvarCarrinho();
    renderizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
    mostrarMensagem(document.querySelector("#mensagemCarrinho"), "Carrinho esvaziado.");
}

function renderizarCarrinho() {
    const lista = document.querySelector("#itensCarrinho");
    const totalElemento = document.querySelector("#totalCarrinho");
    const contador = document.querySelector("#contadorCarrinho");

    if (!lista || !totalElemento) return;

    lista.replaceChildren();

    if (carrinho.length === 0) {
        const vazio = document.createElement("p");
        vazio.textContent = "Seu carrinho está vazio. Adicione um prato do cardápio.";
        lista.appendChild(vazio);
    }

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

        const linha = document.createElement("div");
        linha.className = "item-carrinho";

        const descricao = document.createElement("div");
        const nome = document.createElement("strong");
        nome.textContent = item.nome;
        const subtotal = document.createElement("p");
        subtotal.textContent = `${formatarMoeda(item.preco)} cada · Subtotal: ${formatarMoeda(item.preco * item.quantidade)}`;
        descricao.append(nome, subtotal);

        const controles = document.createElement("div");
        controles.className = "controles-quantidade";

        const menos = document.createElement("button");
        menos.type = "button";
        menos.textContent = "−";
        menos.setAttribute("aria-label", `Diminuir ${item.nome}`);
        menos.addEventListener("click", () => alterarQuantidade(item.nome, -1));

        const quantidade = document.createElement("span");
        quantidade.textContent = item.quantidade;

        const mais = document.createElement("button");
        mais.type = "button";
        mais.textContent = "+";
        mais.setAttribute("aria-label", `Aumentar ${item.nome}`);
        mais.addEventListener("click", () => alterarQuantidade(item.nome, 1));

        const remover = document.createElement("button");
        remover.type = "button";
        remover.className = "botao-remover";
        remover.textContent = "Remover";
        remover.addEventListener("click", () => removerDoCarrinho(item.nome));

        controles.append(menos, quantidade, mais, remover);
        linha.append(descricao, controles);
        lista.appendChild(linha);
    });

    totalElemento.textContent = formatarMoeda(total);
    if (contador) contador.textContent = quantidadeTotal;
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();

    document.querySelectorAll("[data-adicionar]").forEach(botao => {
        botao.addEventListener("click", () => adicionarCarrinho(botao.dataset.adicionar));
    });

    const botaoLimpar = document.querySelector("#limparCarrinho");
    if (botaoLimpar) {
        botaoLimpar.addEventListener("click", limparCarrinho);
    }

    const formCadastro = document.querySelector("#formCadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", evento => {
            evento.preventDefault();
            const senha = document.querySelector("#senhaCadastro").value;
            const confirmacao = document.querySelector("#confirmarSenha").value;
            const mensagem = document.querySelector("#mensagemCadastro");

            if (senha !== confirmacao) {
                mostrarMensagem(mensagem, "As senhas não são iguais. Confira os campos.", true);
                return;
            }

            mostrarMensagem(mensagem, "Demonstração concluída. Nenhuma senha ou dado pessoal foi armazenado. Para cadastro real, é necessário um servidor seguro.");
            formCadastro.reset();
        });
    }

    const formLogin = document.querySelector("#formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", evento => {
            evento.preventDefault();
            mostrarMensagem(
                document.querySelector("#mensagemLogin"),
                "Esta é uma demonstração visual: o site ainda não possui autenticação conectada a um servidor."
            );
            formLogin.reset();
        });
    }

    const formContato = document.querySelector("#formContato");
    if (formContato) {
        formContato.addEventListener("submit", evento => {
            evento.preventDefault();
            mostrarMensagem(
                document.querySelector("#mensagemContato"),
                "Formulário validado! Esta versão é demonstrativa e ainda não envia mensagens para o restaurante."
            );
            formContato.reset();
        });
    }
});
