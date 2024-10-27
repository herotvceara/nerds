let filmesSelecionados = [];
let categoriaAtual = 0; // Índice da categoria atual
let filmeAtual = 0; // Índice do filme atual

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
            if (categoriaAtual < filmesSelecionados.length - 1) {
                categoriaAtual++; // Muda para a próxima categoria
                filmeAtual = 0; // Reseta o filme atual para o primeiro da nova categoria
                atualizarSelecao(carrossel);
            }
        } else if (event.key === 'ArrowUp') {
            // Mover para a categoria anterior
            if (categoriaAtual > 0) {
                categoriaAtual--; // Muda para a categoria anterior
                filmeAtual = 0; // Reseta o filme atual para o primeiro da nova categoria
                atualizarSelecao(carrossel);
            }
        } else if (event.key === 'ArrowRight') {
            // Mover para a próxima capa
            if (filmeAtual < filmesSelecionados[categoriaAtual].length - 1) {
                filmeAtual++;
                atualizarSelecao(carrossel);
            }
        } else if (event.key === 'ArrowLeft') {
            // Mover para a capa anterior
            if (filmeAtual > 0) {
                filmeAtual--;
                atualizarSelecao(carrossel);
            }
        }
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

///////////////////////////////////////////////////////////////////
// Variáveis para rastrear toques
let startX, startY, isMoving = false;

// Função para iniciar o movimento
const touchStart = (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    isMoving = true;
};

// Função para detectar movimento
const touchMove = (event) => {
    if (!isMoving) return;

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    const diffX = startX - currentX;
    const diffY = startY - currentY;

    // Mover o carrossel ou trocar de categoria com base na direção do movimento
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
            // Movimento para a esquerda
            nextCategory();
        } else if (diffX < -50) {
            // Movimento para a direita
            previousCategory();
        }
    }
};

// Função para finalizar o movimento
const touchEnd = () => {
    isMoving = false;
};

// Adiciona os ouvintes de evento ao carrossel
const carouselElement = document.querySelector('.carousel'); // Substitua pelo seletor correto do seu carrossel
carouselElement.addEventListener('touchstart', touchStart);
carouselElement.addEventListener('touchmove', touchMove);
carouselElement.addEventListener('touchend', touchEnd);

// Funções para mudar de categoria
const nextCategory = () => {
    // Sua lógica para ir para a próxima categoria
};

const previousCategory = () => {
    // Sua lógica para voltar para a categoria anterior
};

// Adicione eventos de toque ao carrossel para mover capas
const coverElement = document.querySelector('.cover'); // Substitua pelo seletor correto do seu carrossel
coverElement.addEventListener('touchstart', touchStart);
coverElement.addEventListener('touchmove', touchMove);
coverElement.addEventListener('touchend', touchEnd);

