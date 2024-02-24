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

// Função para alternar a expansão do menu e mudar o texto dos botões
function toggleMenu() {
  var nav = document.querySelector('nav');
  var main = document.querySelector('main');
  var header = document.querySelector('header');
  var toggleButton = document.getElementById('toggleMenuButton');

  // Alternar a expansão do menu
  nav.classList.toggle('expanded');
  main.classList.toggle('menu-expanded');
  header.classList.toggle('header-expanded');
  toggleButton.classList.toggle('expanded');

  // Alterar o texto e ícone do botão com base na expansão do menu
  if (nav.classList.contains('expanded')) {
    configuret.innerText = 'Configuração'; // Ou outro texto apropriado
    toggleButton.innerHTML = '&#xab;';
  } else {
    configuret.innerText = 'Config.';
    toggleButton.innerHTML = '&#9776;';
  }

  // Alterar o texto do botão com base na expansão do menu
  if (nav.classList.contains('expanded')) {
    estetic.innerText = 'Estatisticas';
  } else {
    estetic.innerText = 'Estatist.';
  }
}

// Adicionado script para marcar o botão clicado como ativo
document.querySelectorAll('nav button').forEach(function (button) {
  button.addEventListener('click', function () {
    document.querySelectorAll('nav button').forEach(function (btn) {
      btn.classList.remove('active');
    });
    this.classList.add('active');
  });
});


// button imagem usuario
document.addEventListener('DOMContentLoaded', function () {
  // Adiciona o modal ao corpo do documento
  var modalHtml = `
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div id="popup-content"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // button imagem usuario
  document.addEventListener('click', function (event) {
    var target = event.target;

    // Verifica se o elemento clicado é o botão de imagem do usuário
    if (target.id === 'user-img') {
      // Abre o modal
      var modal = document.getElementById('myModal');
      modal.style.display = 'block';

      // Carrega as imagens da pasta no Firebase Storage e exibe no popup
      var storageRef = firebase.storage().ref('img perfil');
      storageRef.listAll().then(function (result) {
        var popupContent = document.getElementById('popup-content');

        result.items.forEach(function (itemRef, index) {
          itemRef.getDownloadURL().then(function (url) {
            var img = document.createElement('img');
            img.src = url;
            img.alt = 'Imagem do Popup';
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.margin = '5px';
            img.style.borderRadius = '50%'; // Adiciona borda redonda
            img.style.cursor = 'pointer';

            // Adiciona a imagem ao conteúdo da popup
            popupContent.appendChild(img);

            // Adiciona evento de clique à imagem
            img.addEventListener('click', function () {
              // Ao clicar em uma imagem, atribui a nova imagem ao botão
              var userImg = document.getElementById('user-img');
              if (userImg) {
                // Adiciona a URL da imagem diretamente ao Firebase
                var user = firebase.auth().currentUser;
                if (user) {
                  var usuarioRef = firebase.database().ref('usuarios/' + user.uid);
                  usuarioRef.update({
                    'user-img': url
                  }).then(function () {
                    console.log('URL da imagem adicionada ao Firebase com sucesso.');

                    // Atualiza a imagem do botão imediatamente
                    userImg.style.backgroundImage = `url(${url})`;

                    // Fecha a modal
                    modal.style.display = 'none';

                    // Limpa o conteúdo da popup ao fechar
                    popupContent.innerHTML = '';
                  }).catch(function (error) {
                    console.error('Erro ao adicionar a URL da imagem ao Firebase:', error);
                  });
                } else {
                  console.error('Usuário não autenticado.');
                }
              } else {
                console.error('Elemento user-img não encontrado.');
              }
            });
          });
        });
      });
    }
  });

  // ... (restante do seu script)
});
