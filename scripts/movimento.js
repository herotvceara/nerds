let filmesSelecionados = [];
let categoriaAtual = 0; // Índice da categoria atual
let filmeAtual = 0; // Índice do filme atual
let touchStartX = 0;
let touchStartY = 0;

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

    // Eventos de teclado para navegação
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Eventos de toque para navegação em dispositivos móveis
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    atualizarSelecao(carrossel); // Atualiza a seleção ao iniciar
}

function handleKeyboardNavigation(event) {
    const carrossel = document.querySelectorAll('.filmes-container');

    if (event.key === 'ArrowDown') {
        // Mover para a próxima categoria
        if (categoriaAtual < filmesSelecionados.length - 1) {
            categoriaAtual++;
            filmeAtual = 0;
            atualizarSelecao(carrossel);
        }
    } else if (event.key === 'ArrowUp') {
        // Mover para a categoria anterior
        if (categoriaAtual > 0) {
            categoriaAtual--;
            filmeAtual = 0;
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
}

function handleTouchStart(event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}

function handleTouchMove(event) {
    if (!touchStartX || !touchStartY) {
        return;
    }

    const touch = event.touches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    const carrossel = document.querySelectorAll('.filmes-container');

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Deslize horizontal para mover entre capas no carrossel
        if (diffX > 0 && filmeAtual < filmesSelecionados[categoriaAtual].length - 1) {
            // Mover para a próxima capa
            filmeAtual++;
        } else if (diffX < 0 && filmeAtual > 0) {
            // Mover para a capa anterior
            filmeAtual--;
        }
    } else {
        // Deslize vertical para mudar de categoria
        if (diffY > 0 && categoriaAtual < filmesSelecionados.length - 1) {
            // Mover para a próxima categoria
            categoriaAtual++;
            filmeAtual = 0;
        } else if (diffY < 0 && categoriaAtual > 0) {
            // Mover para a categoria anterior
            categoriaAtual--;
            filmeAtual = 0;
        }
    }

    atualizarSelecao(carrossel);

    // Reseta as coordenadas de toque
    touchStartX = 0;
    touchStartY = 0;
}

function atualizarSelecao(carrossel) {
    // Remove a seleção dos filmes nas outras categorias
    filmesSelecionados.forEach((filmes) => {
        filmes.forEach((filme) => {
            filme.classList.remove('selecionado'); // Remove a seleção de todos os filmes
            filme.blur(); // Remove o foco dos filmes
        });
    });

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

        const scrollToPosition = filmePosition - targetPosition + (filmeSelecionado.offsetHeight / 2);
        window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
}
