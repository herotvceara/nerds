// Função para configurar os eventos de clique nos filmes
export function setupFilmClickEvents() {
    const filmes = document.querySelectorAll('.filme');
    const carrossel = document.getElementById('carrossel'); // Seleciona o carrossel

    filmes.forEach(filme => {
        filme.addEventListener('click', () => {
            const url = filme.dataset.video;
            console.log(`Abrindo vídeo: ${url}`);
            openModal(url, carrossel);
        });

        filme.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const url = filme.dataset.video;
                console.log(`Abrindo vídeo: ${url}`);
                openModal(url, carrossel);
            }
        });
    });
}

// Função para abrir o modal e ocultar o carrossel
function openModal(videoUrl, carrossel) {
    // Cria o modal se ainda não existir
    let videoModal = document.getElementById('videoModal');
    if (!videoModal) {
        videoModal = document.createElement('div');
        videoModal.id = 'videoModal';
        videoModal.className = 'modal';
        videoModal.addEventListener('click', (event) => {
            if (event.target === videoModal) {
                closeModal(videoModal, carrossel);
            }
        });

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const closeModalButton = document.createElement('button');
        closeModalButton.className = 'close'; // Atualiza a classe para 'close'
        closeModalButton.textContent = 'X';
        closeModalButton.addEventListener('click', () => {
            console.log("Botão de fechar modal clicado");
            closeModal(videoModal, carrossel);
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

    // Exibe o modal e oculta o carrossel
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
}

// Função para fechar o modal e exibir o carrossel novamente
function closeModal(modal, carrossel) {
    console.log("Fechando modal");
    modal.style.display = 'none';
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause(); // Pausa o vídeo
    videoPlayer.src = ''; // Limpa o src do vídeo
    videoPlayer.controls = false; // Remove os controles do player

    const firstFilm = document.querySelector('.filme'); // Foca de volta no primeiro filme
    if (firstFilm) {
        firstFilm.focus();
    }
}

// Fechar modal ao pressionar "Escape"
window.addEventListener('keydown', (event) => {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    if (event.key === 'Escape' && videoModal && videoModal.style.display === 'block') {
        closeModal(videoModal, carrossel);
    }
});
