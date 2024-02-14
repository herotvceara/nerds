document.addEventListener('DOMContentLoaded', function () {
    // Selecionar o elemento com o ID "linkPdv"
    var linkPdv = document.getElementById('linkPdv');
  
    // Adicionar um ouvinte de evento de clique ao link
    linkPdv.addEventListener('click', function (event) {
      // Impedir o comportamento padrão do link (evitar a navegação)
      event.preventDefault();
  
      // Retrair o menu se estiver expandido
      retrairMenu();
  
      // Criar a janela pop-up
      var popup = document.createElement('div');
      popup.classList.add('popup');
  
      // Adicionar cabeçalho à janela pop-up
      var header = document.createElement('div');
      header.classList.add('header');
      header.innerHTML = '<h2>Sistema PDV Vendas</h2><span class="fechar" onclick="fecharPopup()">X</span>';
      popup.appendChild(header);
  
      // Adicionar conteúdo à janela pop-up
      popup.innerHTML += `
        <label for="idCliente">ID:</label>
        <input type="text" id="idCliente" placeholder="Informe o ID do Cliente" oninput="ajustarTamanhoInput(this)">

  
        <label for="nomeCliente">Nome do Cliente:</label>
        <input type="text" id="nomeCliente" placeholder="Informe o Nome do Cliente">
      `;
  
      // Adicionar a janela pop-up ao corpo do documento
      document.body.appendChild(popup);
    });
  });
  
  function fecharPopup() {
    // Remover a janela pop-up do corpo do documento
    var popup = document.querySelector('.popup');
    if (popup) {
      document.body.removeChild(popup);
    }
  }
  
  function retrairMenu() {
    // Retrair o menu
    var sidebar = document.getElementById('sidebar');
    var overlay = document.querySelector('.overlay');
    
    if (sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  }
  
  function ajustarTamanhoInput(input) {
    // Ajustar a largura com base no comprimento do valor
    input.style.width = ((input.value.length + 1) * 8) + 'px';
  }