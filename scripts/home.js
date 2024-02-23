// Verificar se o usuário está autenticado ao carregar a página
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // O usuário não está autenticado, ocultar a página
    document.body.style.display = 'none';
    window.location.href = "index.html";
  } else {
    // O usuário está autenticado
    var usuario = {
      id: user.uid,
      nome: user.email.split('@')[0],
      email: user.email,
    };

    // Atualizar o email do usuário no botão userEmail
    var userEmailButton = document.getElementById('userEmail');
    userEmailButton.innerText = usuario.email;

    // Adicionar evento de clique ao logoff
    var logoffElement = document.getElementById('logoff');
    logoffElement.addEventListener('click', async function () {
      // Efetuar o logoff no Firebase Authentication
      try {
        await firebase.auth().signOut();
        alert('Logoff realizado!');
        window.location.href = "index.html";
      } catch (error) {
        console.error("Erro ao efetuar logoff", error);
      }
    });
  }
});
