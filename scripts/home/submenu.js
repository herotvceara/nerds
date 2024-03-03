
//SUBMENU PROCESSOS
// Função para exibir o submenu
function toggleSubMenuprocessos() {
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
  function toggleSubMenufinanças() {
    var submenu = document.getElementById("finançasSubmenu");
  
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
  function updateSubmenuPositionfinanças() {
    // Obtém o elemento do botão Cadastros
    var finançasButton = document.getElementById('bntfinanças');
  
    // Obtém o elemento do submenu
    var submenuElement = document.getElementById('finançasSubmenu');
  
    // Obtém o elemento do menu principal
    var mainMenu = document.querySelector('nav');
  
    // Verifica se ambos os elementos foram encontrados antes de continuar
    if (finançasButton && submenuElement && mainMenu) {
      // Obtém as dimensões e a posição do botão Cadastros em relação à janela do navegador
      var buttonRect = finançasButton.getBoundingClientRect();
  
      // Calcula a posição do submenu em relação ao canto superior esquerdo do botão Cadastros
      var finançastop = buttonRect.top + window.scrollY;
  
      // Adiciona as propriedades de estilo ao submenu
      submenuElement.style.top = finançastop + 'px';
  
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
  updateSubmenuPositionfinanças();
  
  // Define um intervalo para verificar e atualizar as posições a cada 1000 milissegundos (1 segundo)
  setInterval(updateSubmenuPositionfinanças, 10);