// Recuperar o email do usuário do armazenamento local
        var userEmail = localStorage.getItem('userEmail');
        
// Exibir o email do usuário no elemento 
        var userInfoElement = document.getElementById('user-info');
        if (userEmail) {
            userInfoElement.innerText = '. Bem-vindo, ' + userEmail;
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

        const logoffButton = document.getElementById('logoff');

    // Adiciona um ouvinte de eventos ao botão de logoff
    logoffButton.addEventListener('click', function() {
        // Adicione aqui a lógica para efetuar o logoff, se necessário
        alert('Logoff realizado!');
    });
        
