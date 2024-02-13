document.addEventListener('DOMContentLoaded', function () {
    // ... (código existente)

    // Manipula o clique nos links do menu
    document.querySelectorAll('a[id^="link"]').forEach(function (link) {
        link.addEventListener('click', function () {
            // Obtém o identificador da seção correspondente
            var sectionId = this.id.replace('link', '');

            // Carrega o conteúdo do arquivo externo
            fetch(sectionId + '.html')
                .then(function (response) {
                    return response.text();
                })
                .then(function (html) {
                    // Atualiza o conteúdo da div com base no identificador da seção
                    document.getElementById('conteudohome').innerHTML = html;
                })
                .catch(function (error) {
                    console.error('Erro ao carregar o conteúdo:', error);
                });

            // Fecha o menu lateral (opcional)
            document.getElementById('sidebar').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        });
    });

    // ... (restante do código)
});
