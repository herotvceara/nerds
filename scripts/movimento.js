let filmesSelecionados = [];
let categoriaAtual = 0; // Índice da categoria atual
let filmeAtual = 0; // Índice do filme atual
let startX = 0; // Posição inicial do toque horizontal
let endX = 0; // Posição final do toque horizontal
let startY = 0; // Posição inicial do toque vertical
let endY = 0; // Posição final do toque vertical

export function inicializarNavegacao() {
    const carrossel = document.querySelectorAll('.filmes-container');

    // Armazena as referências de cada filme
    filmesSelecionados = Array.from(carrossel).map(container => {
        return Array.from(container.children);
    });

    // Foca no primeiro filme da primeira categoria
    if (filmesSelecionados.length > 0 && filmesSelecionados[0].length > 0) {
        filmesSelecionados[0][0].focus(); // Foca no primeiro filme
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            // Mover para a próxima categoria
            moverParaProximaCategoria();
        } else if (event.key === 'ArrowUp') {
            // Mover para a categoria anterior
            moverParaCategoriaAnterior();
        } else if (event.key === 'ArrowRight') {
            // Mover para a próxima capa
            moverParaProximaCapa();
        } else if (event.key === 'ArrowLeft') {
            // Mover para a capa anterior
            moverParaCapaAnterior();
        }
    });

    // Adiciona os eventos de toque para o carrossel
    carrossel.forEach(container => {
        container.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX; // Captura a posição inicial do toque horizontal
            startY = event.touches[0].clientY; // Captura a posição inicial do toque vertical
        });

        container.addEventListener('touchmove', (event) => {
            endX = event.touches[0].clientX; // Captura a posição final do toque horizontal
            endY = event.touches[0].clientY; // Captura a posição final do toque vertical
        });

        container.addEventListener('touchend', () => {
            const deltaX = endX - startX; // Calcula a diferença do toque horizontal
            const deltaY = endY - startY; // Calcula a diferença do toque vertical

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) { // Movimento horizontal
                if (deltaX > 0) {
                    moverParaCapaAnterior();
                } else {
                    moverParaProximaCapa();
                }
            } else if (Math.abs(deltaY) > 50) { // Movimento vertical
                if (deltaY > 0) {
                    moverParaProximaCategoria();
                } else {
                    moverParaCategoriaAnterior();
                }
            }
        });
    });

    atualizarSelecao(carrossel); // Atualiza a seleção ao iniciar
}

function atualizarSelecao(carrossel) {
    // Remove a seleção dos filmes nas outras categorias
    filmesSelecionados.forEach((filmes) => {
        filmes.forEach((filme) => {
            filme.classList.remove('selecionado'); // Remove a seleção de todos os filmes
            filme.blur(); // Remove o foco dos filmes
        });
    });

    // Verifica se há filmes na categoria atual
    if (filmesSelecionados[categoriaAtual].length > 0) {
        const containerAtual = carrossel[categoriaAtual];

        // Move o carrossel para a capa atual
        const offset = filmeAtual * 165; // Cálculo para mover para a capa atual
        containerAtual.scrollTo({ left: offset, behavior: 'smooth' });

        // Adiciona a seleção ao filme atual
        const filmeSelecionado = filmesSelecionados[categoriaAtual][filmeAtual];
        filmeSelecionado.classList.add('selecionado');
        filmeSelecionado.focus(); // Foca no filme selecionado

        // Mantém a capa selecionada a uma posição fixa (60% do topo da tela)
        const targetPosition = window.innerHeight * 0.6; // 60% do topo
        const filmePosition = filmeSelecionado.getBoundingClientRect().top + window.scrollY; // Posição do filme selecionado

        // Calcula a diferença e rola para a posição desejada
        const scrollToPosition = filmePosition - targetPosition + (filmeSelecionado.offsetHeight / 2);
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
}

function moverParaProximaCapa() {
    if (filmeAtual < filmesSelecionados[categoriaAtual].length - 1) {
        filmeAtual++;
        atualizarSelecao(carrossel);
    }
}

function moverParaCapaAnterior() {
    if (filmeAtual > 0) {
        filmeAtual--;
        atualizarSelecao(carrossel);
    }
}

function moverParaProximaCategoria() {
    if (categoriaAtual < filmesSelecionados.length - 1) {
        categoriaAtual++; // Muda para a próxima categoria
        filmeAtual = 0; // Reseta o filme atual para o primeiro da nova categoria
        atualizarSelecao(carrossel);
    }
}

function moverParaCategoriaAnterior() {
    if (categoriaAtual > 0) {
        categoriaAtual--; // Muda para a categoria anterior
        filmeAtual = 0; // Reseta o filme atual para o primeiro da nova categoria
        atualizarSelecao(carrossel);
    }
}

// Obtém o modal
const isaacModal = document.getElementById("isaacModal");

// Função para abrir o modal
function openIsaacModal() {
    isaacModal.style.display = "block";
}

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
    if (event.target === isaacModal) {
        isaacModal.style.display = "none";
    }
}

// Abre o modal ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    openIsaacModal();
});
