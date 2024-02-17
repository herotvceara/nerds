document.addEventListener('DOMContentLoaded', function () {
  // Selecionar o elemento com o ID "linkPdv"
  var linkPdv = document.getElementById('linkPdv');

  // Adicionar um ouvinte de evento de clique ao link
  linkPdv.addEventListener('click', function (event) {
    // Impedir o comportamento padrão do link (evitar a navegação)
    event.preventDefault();

    // Retrair o menu
    retrairMenu();

    // Criar a tela preta semi-transparente
    var overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');
    document.body.appendChild(overlay);

    // Criar a janela pop-up
    var popup = document.createElement('div');
    popup.classList.add('popup');

    // Adicionar cabeçalho à janela pop-up
    var header = document.createElement('div');
    header.classList.add('header');
    var popupTitle = document.createElement('div');
    popupTitle.classList.add('popup-title');
    popupTitle.innerHTML = '<h2>PDV - Ponto de Vendas</h2>';
    header.appendChild(popupTitle);
    header.innerHTML += '<span class="fechar" onclick="fecharPopup()">X</span>';
    popup.appendChild(header);

    // Adicionar linha cinza no início do pop-up
    var greyLine = document.createElement('div');
    greyLine.classList.add('grey-line');
    popup.appendChild(greyLine);

    // Adicionar conteúdo à janela pop-up
    popup.innerHTML += `<div class="popup-content">
    <label for="idV"><strong>ID Venda:</strong></label> <br>
    <input class="IDclass" type="text" id="idVenda" value="000" onkeydown="return false;">
    <br>
    <label for="idCliente" style="margin-right: 35px;"><strong>ID:</strong></label>
    <label for="nomeCliente" style="margin-left: 10px;"><strong>Nome do Cliente:</strong></label><br>
    <input class="IDclass" type="text" id="idCliente" style="margin-right: 10px;">
    <input type="text" id="nomeCliente" placeholder="Informe o Nome do Cliente">
</div>`;

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

  // Remover a tela preta semi-transparente
  var overlay = document.querySelector('.popup-overlay');
  if (overlay) {
    document.body.removeChild(overlay);
  }
}

document.addEventListener('input', function (event) {
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

function retrairMenu() {
  // Retrair o menu lateral
  var sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("active");
}