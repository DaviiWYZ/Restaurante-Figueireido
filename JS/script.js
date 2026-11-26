
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Função de demonstração para os formulários
document.addEventListener("DOMContentLoaded", () => {

    const formularios = document.querySelectorAll(".formulario");

    formularios.forEach(formulario => {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const mensagem = formulario.querySelector(".mensagem");

            if (mensagem) {
                mensagem.textContent =
                    "Formulário preenchido com sucesso! Esta é uma demonstração.";
            }
        });
    });

});
