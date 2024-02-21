// Recuperar o email do usuário do armazenamento local
var userEmail = localStorage.getItem('userEmail');

// Lógica para verificar o login e redirecionar se não estiver logado
if (!userEmail) {
  alert('Você não está logado!');
  window.location.href = "index.html";
}

// Atualizar o texto do botão userEmail com o email do usuário
var userEmailButton = document.getElementById('userEmail');
userEmailButton.innerText = userEmail;

// Adicionar evento de clique ao logoff
var logoffElement = document.getElementById('logoff');
logoffElement.addEventListener('click', function() {
  // Limpar o armazenamento local
  localStorage.removeItem('userEmail');
  // Redirecionar para a página de login
  window.location.href = "index.html";
});

// Adiciona um ouvinte de eventos ao botão de logoff
logoffElement.addEventListener('click', function() {
    // Adicione aqui a lógica para efetuar o logoff, se necessário
    alert('Logoff realizado!');
});
