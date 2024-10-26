// Função para configurar os eventos de clique nos filmes
export function setupFilmClickEvents() {
    const filmes = document.querySelectorAll('.filme');
    const carrossel = document.getElementById('carrossel'); // Seleciona o carrossel

    filmes.forEach(filme => {
        filme.addEventListener('click', () => {
            const url = filme.dataset.video;
            console.log(`Abrindo vídeo: ${url}`);
            openModal(url);
        });

        filme.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const url = filme.dataset.video;
                console.log(`Abrindo vídeo: ${url}`);
                openModal(url);
            }
        });
    });
}

// Função para abrir o modal e ocultar o restante do HTML
function openModal(videoUrl) {
    // Cria o modal se ainda não existir
    let videoModal = document.getElementById('videoModal');
    if (!videoModal) {
        videoModal = document.createElement('div');
        videoModal.id = 'videoModal';
        videoModal.className = 'modal';
        videoModal.addEventListener('click', (event) => {
            if (event.target === videoModal) {
                closeModal(videoModal);
            }
        });

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const closeModalButton = document.createElement('button');
        closeModalButton.className = 'close'; // Atualiza a classe para 'close'
        closeModalButton.textContent = 'X';
        closeModalButton.addEventListener('click', () => {
            console.log("Botão de fechar modal clicado");
            closeModal(videoModal);
        });

        const videoPlayer = document.createElement('video');
        videoPlayer.id = 'videoPlayer';
        videoPlayer.className = 'video-player'; // Atualiza a classe para 'video-player'
        videoPlayer.controls = true; // Exibe os controles do vídeo
        videoPlayer.textContent = 'Seu navegador não suporta o vídeo.';

        // Adiciona os elementos ao modal
        modalContent.appendChild(closeModalButton);
        modalContent.appendChild(videoPlayer);
        videoModal.appendChild(modalContent);
        document.body.appendChild(videoModal); // Adiciona o modal ao body
    }

    const videoPlayer = document.getElementById('videoPlayer');

    // Configurações do player
    videoPlayer.src = videoUrl;
    videoPlayer.play(); // Inicia a reprodução do vídeo

    // Oculta o restante do HTML (exceto o tema)
    const bodyContent = document.querySelector('#carrossel'); // ou outro seletor que englobe o conteúdo
    if (bodyContent) {
        bodyContent.style.display = 'none';
    }

    // Exibe o modal
    videoModal.style.display = 'block';
    videoPlayer.focus(); // Foca no player de vídeo

    // Exibir controles ao passar o mouse sobre o modal
    videoModal.addEventListener('mouseenter', () => {
        const controls = document.querySelector('.player-controls');
        if (controls) {
            controls.style.display = 'flex'; // Mostra os controles
        }
    });

    videoModal.addEventListener('mouseleave', () => {
        const controls = document.querySelector('.player-controls');
        if (controls) {
            controls.style.display = 'none'; // Esconde os controles
        }
    });
    // Configura navegação pelas setas direcionais dentro do modal
    setupDirectionalNavigation(videoModal);
}

// Função para navegar entre elementos usando teclas direcionais
function setupDirectionalNavigation(modal) {
    const focusableElements = modal.querySelectorAll('.close, .video-player');
    let currentFocusIndex = 0;

    modal.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            currentFocusIndex = (currentFocusIndex + 1) % focusableElements.length;
            focusableElements[currentFocusIndex].focus();
            event.preventDefault();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            currentFocusIndex = (currentFocusIndex - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[currentFocusIndex].focus();
            event.preventDefault();
        }
    });
}

// Função para fechar o modal e exibir o HTML novamente
function closeModal(modal) {
    console.log("Fechando modal");
    modal.style.display = 'none';
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause(); // Pausa o vídeo
    videoPlayer.src = ''; // Limpa o src do vídeo

    // Exibe o restante do HTML
    const bodyContent = document.querySelector('#carrossel'); // ou outro seletor que englobe o conteúdo
    if (bodyContent) {
        bodyContent.style.display = 'block';
    }

    const firstFilm = document.querySelector('.filme'); // Foca de volta no primeiro filme
    if (firstFilm) {
        firstFilm.focus();
    }
}

// Fechar modal ao pressionar "Escape"
window.addEventListener('keydown', (event) => {
    const videoModal = document.getElementById('videoModal');
    if (event.key === 'Escape' && videoModal && videoModal.style.display === 'block') {
        closeModal(videoModal);
    }
});
