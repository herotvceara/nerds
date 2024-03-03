
//SUBMENU PROCESSOS
// Função para exibir o submenu
function toggleSubMenuprocessos() {
  hideOtherSubmenus("processosSubmenu");
    var submenu = document.getElementById("processosSubmenu");
  
    if (submenu.style.display === "block") {
      submenu.style.animation = "collapseSubMenu 0.5s ease-in-out forwards";
      submenu.addEventListener("animationend", function() {
        submenu.style.display = "none";
      }, { once: true });
    } else {
      submenu.style.animation = "expandSubMenu 0.5s ease-in-out forwards";
      submenu.style.display = "block";
      
    }
  }
  //posicao submenu
  function updateSubmenuPositionprocessos() {
    // Obtém o elemento do botão Cadastros
    var processosButton = document.getElementById('bntprocessos');
  
    // Obtém o elemento do submenu
    var submenuElement = document.getElementById('processosSubmenu');
  
    // Obtém o elemento do menu principal
    var mainMenu = document.querySelector('nav');
  
    // Verifica se ambos os elementos foram encontrados antes de continuar
    if (processosButton && submenuElement && mainMenu) {
      // Obtém as dimensões e a posição do botão Cadastros em relação à janela do navegador
      var buttonRect = processosButton.getBoundingClientRect();
  
      // Calcula a posição do submenu em relação ao canto superior esquerdo do botão Cadastros
      var processostop = buttonRect.top + window.scrollY;
  
      // Adiciona as propriedades de estilo ao submenu
      submenuElement.style.top = processostop + 'px';
  
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
  updateSubmenuPositionprocessos();
  
  // Define um intervalo para verificar e atualizar as posições a cada 1000 milissegundos (1 segundo)
  setInterval(updateSubmenuPositionprocessos, 10);
  
  // SUBMENU CADASTROS
  // Função para exibir o submenu
  function toggleSubMenucadastros() {
    hideOtherSubmenus("cadastrosSubmenu");
    var submenu = document.getElementById("cadastrosSubmenu");
  
    if (submenu.style.display === "block") {
      submenu.style.animation = "collapseSubMenu 0.5s ease-in-out forwards";
      submenu.addEventListener("animationend", function() {
        submenu.style.display = "none";
      }, { once: true });
    } else {
      submenu.style.animation = "expandSubMenu 0.5s ease-in-out forwards";
      submenu.style.display = "block";
      
    }
  }
  //posicao submenu
  function updateSubmenuPositioncadastros() {
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
  updateSubmenuPositioncadastros();
  
  // Define um intervalo para verificar e atualizar as posições a cada 1000 milissegundos (1 segundo)
  setInterval(updateSubmenuPositioncadastros, 10);
  
  // SUBMENU RELATORIOS
  // Função para exibir o submenu
  function toggleSubMenurelatorios() {
    hideOtherSubmenus("relatoriosSubmenu");
    var submenu = document.getElementById("relatoriosSubmenu");
  
    if (submenu.style.display === "block") {
      submenu.style.animation = "collapseSubMenu 0.5s ease-in-out forwards";
      submenu.addEventListener("animationend", function() {
        submenu.style.display = "none";
      }, { once: true });
    } else {
      submenu.style.animation = "expandSubMenu 0.5s ease-in-out forwards";
      submenu.style.display = "block";
      
    }
  }
  //posicao submenu
  function updateSubmenuPositionrelatorios() {
    // Obtém o elemento do botão Cadastros
    var relatoriosButton = document.getElementById('bntrelatorios');
  
    // Obtém o elemento do submenu
    var submenuElement = document.getElementById('relatoriosSubmenu');
  
    // Obtém o elemento do menu principal
    var mainMenu = document.querySelector('nav');
  
    // Verifica se ambos os elementos foram encontrados antes de continuar
    if (relatoriosButton && submenuElement && mainMenu) {
      // Obtém as dimensões e a posição do botão Cadastros em relação à janela do navegador
      var buttonRect = relatoriosButton.getBoundingClientRect();
  
      // Calcula a posição do submenu em relação ao canto superior esquerdo do botão Cadastros
      var relatoriostop = buttonRect.top + window.scrollY;
  
      // Adiciona as propriedades de estilo ao submenu
      submenuElement.style.top = relatoriostop + 'px';
  
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
  updateSubmenuPositionrelatorios();
  
  // Define um intervalo para verificar e atualizar as posições a cada 1000 milissegundos (1 segundo)
  setInterval(updateSubmenuPositionrelatorios, 10);

   // SUBMENU FINANÇAS
  // Função para exibir o submenu
  function toggleSubMenufinancas() {
    hideOtherSubmenus("financasSubmenu");
    var submenu = document.getElementById("financasSubmenu");
  
    if (submenu.style.display === "block") {
      submenu.style.animation = "collapseSubMenu 0.5s ease-in-out forwards";
      submenu.addEventListener("animationend", function() {
        submenu.style.display = "none";
      }, { once: true });
    } else {
      submenu.style.animation = "expandSubMenu 0.5s ease-in-out forwards";
      submenu.style.display = "block";
      
    }
  }
  //posicao submenu
  function updateSubmenuPositionfinancas() {
    // Obtém o elemento do botão Cadastros
    var financasButton = document.getElementById('bntfinancas');
  
    // Obtém o elemento do submenu
    var submenuElement = document.getElementById('financasSubmenu');
  
    // Obtém o elemento do menu principal
    var mainMenu = document.querySelector('nav');
  
    // Verifica se ambos os elementos foram encontrados antes de continuar
    if (financasButton && submenuElement && mainMenu) {
      // Obtém as dimensões e a posição do botão Cadastros em relação à janela do navegador
      var buttonRect = financasButton.getBoundingClientRect();
  
      // Calcula a posição do submenu em relação ao canto superior esquerdo do botão Cadastros
      var financastop = buttonRect.top + window.scrollY;
  
      // Adiciona as propriedades de estilo ao submenu
      submenuElement.style.top = financastop + 'px';
  
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
  updateSubmenuPositionfinancas();
  
  // Define um intervalo para verificar e atualizar as posições a cada 1000 milissegundos (1 segundo)
  setInterval(updateSubmenuPositionfinancas, 10);


  function handleButtonClickWithoutSubmenu() {
    hideOtherSubmenus();
}
  // Função para ocultar outros submenus
function hideOtherSubmenus(currentSubmenuId) {
  var submenus = document.querySelectorAll('.submenu');
  submenus.forEach(function (submenu) {
      if (submenu.id !== currentSubmenuId && submenu.style.display === "block") {
          submenu.style.animation = "collapseSubMenu 0.5s ease-in-out forwards";
          submenu.addEventListener("animationend", function () {
              submenu.style.display = "none";
             
          }, { once: true });
      }
  });
}