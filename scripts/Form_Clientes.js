// Referência à coleção "Clientes" no Firestore
var clientesCollection = firebase.firestore().collection('Clientes');

// Função para obter os documentos da coleção "Clientes"
clientesCollection.get().then((querySnapshot) => {
  // Verificar se há documentos na coleção
  if (!querySnapshot.empty) {
    // Obter os títulos dos campos do primeiro cliente
    const primeiroCliente = querySnapshot.docs[0];
    const titulosCampos = Object.keys(primeiroCliente.data());

    // Reorganizar os títulos para priorizar "ID", "Nome", "CPF", "Endereço"
    const titulosOrdenados = ['ID', 'Nome', 'CPF', 'Endereço']
      .concat(titulosCampos.filter(titulo => !['ID', 'Nome', 'CPF', 'Endereço'].includes(titulo)));

    // Adicionar os títulos à tabela no HTML
    const theadElement = document.getElementById('tabelaClientes').getElementsByTagName('thead')[0];
    const trElement = theadElement.getElementsByTagName('tr')[0];

    // Limpar o conteúdo atual do cabeçalho
    trElement.innerHTML = '';

    // Adicionar os títulos dinamicamente ao cabeçalho
    titulosOrdenados.forEach((titulo) => {
      const thElement = document.createElement('th');
      thElement.textContent = titulo;
      trElement.appendChild(thElement);
    });

    // Adicionar títulos extras para editar e excluir no final
    const thEditar = document.createElement('th');
    thEditar.textContent = 'Editar';
    trElement.appendChild(thEditar);

    const thExcluir = document.createElement('th');
    thExcluir.textContent = 'Excluir';
    trElement.appendChild(thExcluir);

    // Adicionar os dados à tabela no HTML
    const tbodyElement = document.getElementById('tabelaClientes').getElementsByTagName('tbody')[0];

    // Limpar o conteúdo atual do corpo da tabela
    tbodyElement.innerHTML = '';

    // Adicionar os dados dinamicamente ao corpo da tabela
    querySnapshot.forEach((cliente, index) => {
      const trCliente = document.createElement('tr'); // Criar uma nova linha para cada cliente

      titulosOrdenados.forEach((titulo) => {
        const tdElement = document.createElement('td');
        const valor = cliente.data()[titulo];

        // Formatar a data de nascimento (assumindo que o campo é chamado "Data Nasc.")
        if (titulo === 'Data Nasc.' && valor instanceof firebase.firestore.Timestamp) {
          const dataNascimento = valor.toDate();
          const dataFormatada = `${dataNascimento.getDate()}/${dataNascimento.getMonth() + 1}/${dataNascimento.getFullYear()}`;
          tdElement.textContent = dataFormatada;
        } else {
          tdElement.textContent = valor;
        }

        trCliente.appendChild(tdElement); // Adicionar célula à linha do cliente
      });

      // Adicionar as células de editar e excluir ao final de cada linha
      const tdEditar = document.createElement('td');
      tdEditar.classList.add('acao');
      const buttonEditar = document.createElement('button');
      buttonEditar.innerHTML = `<i class='bx bx-edit'></i>`;
      buttonEditar.onclick = () => editItem(index);
      tdEditar.appendChild(buttonEditar);
      trCliente.appendChild(tdEditar);

      const tdExcluir = document.createElement('td');
      tdExcluir.classList.add('acao');
      const buttonExcluir = document.createElement('button');
      buttonExcluir.innerHTML = `<i class='bx bx-trash'></i>`;
      buttonExcluir.onclick = () => deleteItem(index);
      tdExcluir.appendChild(buttonExcluir);
      trCliente.appendChild(tdExcluir);

      tbodyElement.appendChild(trCliente); // Adicionar a linha do cliente ao corpo da tabela
    });
  } else {
    console.log('A coleção "Clientes" está vazia.');
  }
}).catch((error) => {
  console.error('Erro ao obter documentos:', error);
});

 // Obtém o botão pelo ID
 const btnhome= document.getElementById('home');

 // Adiciona um evento de clique ao botão
 btnhome.onclick = function() {
     // Redireciona para a página desejada ao clicar no botão
     window.location.href = '../pages/home.html';
 };
// Botão "Novo Cliente"
const btnNovoCliente = document.getElementById('new');
btnNovoCliente.onclick = () => openModalCadastroCliente();

// Modal de cadastro de cliente
const modalCadastroCliente = document.querySelector('.modalcadcliente-container');
const modalCadastroClienteForm = document.getElementById('modalCadastroClienteForm');

// Função para abrir o modal de cadastro de cliente
function openModalCadastroCliente() {
  modalCadastroCliente.classList.add('active');

  // Limpar o conteúdo atual do formulário no modal
  modalCadastroClienteForm.innerHTML = '';

  // Adicionar título no topo do modal
  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  const tituloElement = document.createElement('h2');
  tituloElement.textContent = 'Informações do Cliente';

  const btnFecharElement = document.createElement('span');
  btnFecharElement.innerHTML = '&times;'; // X para fechar
  btnFecharElement.classList.add('close-btn');
  btnFecharElement.onclick = closeModalCadastroCliente;

  modalHeader.appendChild(tituloElement);
  modalHeader.appendChild(btnFecharElement);

  modalCadastroClienteForm.appendChild(modalHeader);


  // Referência à coleção "Clientes" no Firestore
  var clientesCollection = firebase.firestore().collection('Clientes');

  // Obter os documentos da coleção "Clientes"
  clientesCollection.get().then((querySnapshot) => {
    // Verificar se há documentos na coleção
    if (!querySnapshot.empty) {
      // Obter os títulos dos campos do primeiro cliente
      const primeiroCliente = querySnapshot.docs[0];
      const titulosCampos = Object.keys(primeiroCliente.data());

      // Reorganizar os títulos para priorizar "ID", "Nome", "CPF", "Endereço"
      const titulosOrdenados = ['ID', 'Nome', 'CPF', 'Endereço']
        .concat(titulosCampos.filter(titulo => !['ID', 'Nome', 'CPF', 'Endereço'].includes(titulo)));

      // Criar inputs e labels dinamicamente com base nos títulos
      titulosOrdenados.forEach((titulo) => {
        // Verifica se o título não é "Status Monetario" nem "Volume"
        if (titulo !== 'Status Monetário' && titulo !== 'Volume') {
          const containerElement = document.createElement('div'); // Container para cada label e input
          containerElement.classList.add('input-container');
      
          const labelElement = document.createElement('label');
          labelElement.textContent = titulo;
          labelElement.classList.add('modal-label'); // Add this class for styling
      
          const inputContainer = document.createElement('div'); // Container para o input
          inputContainer.classList.add('input-container-inline');
      
          const inputElement = document.createElement('input');
          inputElement.type = 'text';
          inputElement.id = `m-${titulo.toLowerCase().replace(/\s/g, '-')}`;
          inputElement.classList.add('dynamic-input', 'modal-input'); // Add these classes for styling
      
          inputContainer.appendChild(inputElement);
      
          // Adiciona os elementos ao formulário (substitua modalCadastroClienteForm pelo seu elemento formulário)
          containerElement.appendChild(labelElement);
          containerElement.appendChild(inputContainer);
          modalCadastroClienteForm.appendChild(containerElement);
        }
        // Se for "Status Monetario" ou "Volume", não faz nada, ignorando a criação de label e input.
      });
      
      

      // Adicionar botão de salvar ao formulário
      const btnSaveElement = document.createElement('button');
      btnSaveElement.id = 'btnSalvar';
      btnSaveElement.textContent = 'Salvar';
      btnSaveElement.onclick = saveCliente; // Adicione a função de salvar (se necessário)

      modalCadastroClienteForm.appendChild(btnSaveElement);
    } else {
      console.log('A coleção "Clientes" está vazia.');
    }
  }).catch((error) => {
    console.error('Erro ao obter documentos:', error);
  });
}

// ... (restante do seu código)

// Função para salvar o cliente (ajuste conforme necessário)
function saveCliente() {
  // Lógica para salvar o cliente no Firestore ou realizar outras operações necessárias
  // ...

  // Fechar o modal após salvar
  modalCadastroCliente.classList.remove('active');
}

// Função para fechar o modal e limpar o conteúdo
function closeModalCadastroCliente() {
  modalCadastroCliente.classList.remove('active');
  modalCadastroClienteForm.innerHTML = '';
}