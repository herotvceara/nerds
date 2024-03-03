
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