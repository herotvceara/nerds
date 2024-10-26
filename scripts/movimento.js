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
        const offset = (filmeAtual * 165) - (window.innerWidth / 2 - 75); // Cálculo para centralizar
        containerAtual.scrollTo({ left: offset, behavior: 'smooth' });

        // Adiciona a seleção ao filme atual
        const filmeSelecionado = filmesSelecionados[categoriaAtual][filmeAtual];
        filmeSelecionado.classList.add('selecionado');
        filmeSelecionado.focus(); // Foca no filme selecionado
    }
}
