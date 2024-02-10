// Recuperar o email do usuário do armazenamento local
        var userEmail = localStorage.getItem('userEmail');
        
// Exibir o email do usuário no elemento 
        var userInfoElement = document.getElementById('user-info');
        if (userEmail) {
            userInfoElement.innerText = 'Bem-vindo, ' + userEmail;
            // Se houver um email, exibir o conteúdo
            document.getElementById('content').style.display = 'block';
        } else {
             // Se o usuário não estiver logado, exibir uma mensagem de alerta
            alert('Você não está logado!');
             // Redirecionar o usuário para a página de login
            window.location.href = "index.html";
        }

// Adicionar evento de clique ao logoff
        var logoffElement = document.getElementById('logoff');
        logoffElement.addEventListener('click', function() {
            
            // Redirecionar para a página de login
            window.location.href = "index.html";
            // Remover o nome do usuário do armazenamento local
            localStorage.removeItem('userEmail');
        });
// barra lateral
document.addEventListener("DOMContentLoaded", function() {
    const menuContainer = document.querySelector('.menu-container');
    const logoffButton = document.getElementById('logoff');

    // Adiciona um ouvinte de eventos ao botão de logoff
    logoffButton.addEventListener('click', function() {
        // Adicione aqui a lógica para efetuar o logoff, se necessário
        alert('Logoff realizado!');
    });

    // Adiciona um ouvinte de eventos ao conteúdo para fechar o menu ao clicar fora dele
    document.getElementById('content').addEventListener('click', function() {
        if (menuContainer.style.left === '0px') {
            menuContainer.style.left = '-250px';
        }
    });

    // Adiciona um ouvinte de eventos ao conteúdo para evitar que o clique no menu propague
    menuContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Adiciona um ouvinte de eventos para abrir e fechar o menu ao clicar no botão de menu
    document.getElementById('content').addEventListener('click', function() {
        if (menuContainer.style.left === '-250px') {
            menuContainer.style.left = '0';
        } else {
            menuContainer.style.left = '-250px';
        }
    });
});
