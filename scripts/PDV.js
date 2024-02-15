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
      popup.innerHTML += `<br><label for="idV">ID Venda:</label>
      <input class="IDclass" type="text" id="idVenda" value="000" onkeydown="return false;">
      <br>
      
      <label for="idCliente">ID:</label>
      <input class="IDclass" type="text" id="idCliente">
      
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
  
  document.addEventListener('input', function(event) {
    if (event.target.classList.contains('IDclass') && event.target.type === 'text') {
        // Limitar o comprimento
        if (event.target.value.length > 25) {
            event.target.value = event.target.value.slice(0, 25);
        }

        // Garantir que apenas números sejam permitidos
        event.target.value = event.target.value.replace(/[^0-9]/g, '');

        // Definir o tamanho mínimo
        const tamanhoMinimo = 5;

        // Adicionar tamanho de acordo com o texto digitado
        if (event.target.value.length <= tamanhoMinimo) {
            event.target.style.width = tamanhoMinimo + "ch";
        } else {
            // Incrementar o tamanho além do tamanho mínimo
            event.target.style.width = event.target.value.length + "ch";
        }
    }
});
 
  
  
  
