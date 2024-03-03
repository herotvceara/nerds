
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
  
  