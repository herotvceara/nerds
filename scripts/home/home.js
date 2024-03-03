
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // O usuário não está autenticado, ocultar a página
    document.body.style.display = 'none';
    window.location.href = "../index.html";
  } else {
    // O usuário está autenticado
    
    var usuario = {
      id: user.uid,
      nome: user.displayName,
      email: user.email,
      img_user: user.photoURL || null, // Alterado para tentar obter a imagem do usuário do Firebase Authentication
    };

    // Verificar se o usuário tem uma URL de imagem de perfil armazenada no banco de dados
    var usuarioRef = firebase.database().ref('usuarios/' + user.uid);
    usuarioRef.once('value').then(function (snapshot) {
      var userData = snapshot.val();
      if (userData && userData['user-img']) {
        usuario.img_user = userData['user-img'];
      }

      // Atualizar o email do usuário no botão userEmail
      var userEmailButton = document.getElementById('userEmail');
      userEmailButton.innerText = usuario.email;

      // Adicionar a imagem de usuário ao fundo do botão user-img
      var userImgButton = document.getElementById('user-img');
      if (usuario.img_user) {
        userImgButton.style.backgroundImage = "url('" + usuario.img_user + "')";
        userImgButton.style.backgroundSize = 'cover'; // Ajustar o tamanho da imagem de fundo
      }

      // Adicionar evento de clique ao logoff
      var logoffElement = document.getElementById('logoff');
      logoffElement.addEventListener('click', async function () {
        // Efetuar o logoff no Firebase Authentication
        try {
          await firebase.auth().signOut();
          alert('Logoff realizado!');
          window.location.href = "../index.html";
        } catch (error) {
          console.error("Erro ao efetuar logoff", error);
        }
      });
    });
  }
});

document.addEventListener('click', function (event) {
  var clickedElement = event.target;

  // Check if the clicked element is not a menu, submenu, or a button that triggers a submenu
  if (!clickedElement.closest('nav') && !clickedElement.classList.contains('submenu') && !clickedElement.classList.contains('submenu-button')) {
    hideOtherSubmenus();
  }
});
