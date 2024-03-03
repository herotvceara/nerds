
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


// Função para alternar a expansão do menu e mudar o texto dos botões
function toggleMenu() {
  var nav = document.querySelector('nav');
  var main = document.querySelector('main');
  var header = document.querySelector('header');
  var toggleButton = document.getElementById('toggleMenuButton');
  var toggleSubMenu = document.getElementById('toggleSubMenu');

  // Alternar a expansão do menu
  nav.classList.toggle('expanded');
  main.classList.toggle('menu-expanded');
  header.classList.toggle('header-expanded');
  toggleButton.classList.toggle('expanded');
  toggleSubMenu.classList.toggle('expanded');
  

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


document.addEventListener('DOMContentLoaded', function () {
  // Adiciona o modal ao corpo do documento
  var modalHtml = `
  <div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Escolha sua imagem de Perfil</h2> <!-- Título adicionado aqui -->
    <div id="popup-content"></div>
  </div>
  <button id="uploadButton">Upload de Imagem</button>
</div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // button imagem usuario
  document.addEventListener('click', function (event) {
    var target = event.target;

    // Verifica se o elemento clicado é o botão de imagem do usuário
    if (target.id === 'user-img') {
      // Obtém o modal
      var modal = document.getElementById('myModal');

      // Verifica se o modal está aberto ou fechado
      if (modal.style.display === 'block') {
        modal.style.display = 'none'; // Fecha o modal se estiver aberto
          // Limpa o conteúdo da popup
      var popupContent = document.getElementById('popup-content');
      popupContent.innerHTML = '';
      } else {
        modal.style.display = 'block'; // Abre o modal se estiver fechado

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
              img.style.margin = '8px';
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
    }
  });

      // Fechar popup ao clicar no botão "x"
      var closeButton = document.querySelector('.close');
      closeButton.addEventListener('click', function () {
        var modal = document.getElementById('myModal');
        modal.style.display = 'none';

          // Limpa o conteúdo da popup
        var popupContent = document.getElementById('popup-content');
        popupContent.innerHTML = '';
          });

          // upload perfil
          document.getElementById('uploadButton').addEventListener('click', function() {
            // Verifique se há um usuário autenticado
            var user = auth.currentUser;
            if (user) {
              // Crie um input do tipo file para permitir a seleção de arquivos
              var fileInput = document.createElement('input');
              fileInput.type = 'file';
          
              // Adicione um ouvinte de mudança para o input de arquivo
              fileInput.addEventListener('change', function(event) {
                // Obtenha o arquivo selecionado
                var file = event.target.files[0];
          
                // Extraia o nome do usuário do e-mail
                var userEmail = user.email || ''; // Certifique-se de que o e-mail está disponível
                var userName = userEmail.split('@')[0]; // Obtém a parte antes do '@'
          
                // Referência ao storage do Firebase e à pasta 'img perfil'
                var storageRef = firebase.storage().ref('img perfil/' + userName);
          
                // Faça o upload do arquivo
                storageRef.put(file).then(function(snapshot) {
                  // Quando o upload é bem-sucedido
                  console.log('Upload concluído com sucesso!');
          
                  // Obtenha a URL do arquivo no storage
                  return storageRef.getDownloadURL();
                }).then(function(url) {
                  // Atualiza o background do botão user-img
                  document.getElementById('user-img').style.backgroundImage = `url(${url})`;
          
                  closeModal();
                }).catch(function(error) {
                  // Em caso de erro no upload
                  console.error('Erro no upload:', error);
                });
              });
          
              // Clique no input de arquivo ao ser criado
              fileInput.click();
            } else {
              console.log('Nenhum usuário autenticado.');
            }
          });
          
          // Função para fechar o modal
      function closeModal() {
        var modal = document.getElementById('myModal');
        var popupContent = document.getElementById('popup-content');
        
        // Fecha o modal
        if (modal) {
          modal.style.display = 'none';
        }

        // Limpa o conteúdo da popup
        if (popupContent) {
          popupContent.innerHTML = '';
        }
      }
          
});



// Função para exibir o submenu
function toggleSubMenucadastros() {
  var submenu = document.getElementById("cadastrosSubmenu");

  if (!submenu.style.display || submenu.style.display === "none") {
    submenu.style.animation = "expandSubMenu 0.5s ease-in-out forwards";
    submenu.style.display = "block";
  } else {
    submenu.style.animation = "collapseSubMenu 0.5s ease-in-out forwards";
    submenu.addEventListener("animationend", function() {
      submenu.style.display = "none";
    }, { once: true });
  }
}

//posicao submenu
function updateSubmenuPosition() {
  // Obtém o elemento do botão Cadastros
  var cadastrosButton = document.getElementById('bntcadastros');

  // Obtém o elemento do submenu
  var submenuElement = document.getElementById('cadastrosSubmenu');

  // Obtém o elemento do menu principal
  var mainMenu = document.querySelector('nav');

  // Verifica se ambos os elementos foram encontrados antes de continuar
  if (cadastrosButton && submenuElement && mainMenu) {
    // Obtém as dimensões e a posição do botão Cadastros em relação à janela do navegador
    var buttonRect = cadastrosButton.getBoundingClientRect();

    // Calcula a posição do submenu em relação ao canto superior esquerdo do botão Cadastros
    var cadastrotop = buttonRect.top + window.scrollY;

    // Adiciona as propriedades de estilo ao submenu
    submenuElement.style.top = cadastrotop + 'px';

    // Verifica se o menu principal está expandido
    if (mainMenu.classList.contains('expanded')) {
      // Se estiver expandido, move o submenu para a direita
      submenuElement.style.left = '12.8%';
    } else {
      // Se não estiver expandido, volta à posição original
      submenuElement.style.left = '5.3%';
    }
  }
}

// Chama a função inicialmente para configurar o submenu
updateSubmenuPosition();

// Define um intervalo para verificar e atualizar as posições a cada 1000 milissegundos (1 segundo)
setInterval(updateSubmenuPosition, 10);

function collapseSubMenu(submenu) {
  // Adiciona a classe de animação ao submenu
  submenu.style.animation = "collapseSubMenu 0.5s ease-in-out forwards";

  // Adiciona um ouvinte de evento para detectar o final da animação
  submenu.addEventListener("animationend", function() {
    // Quando a animação terminar, define o estilo de exibição como "none"
    submenu.style.display = "none";
  }, { once: true });
}