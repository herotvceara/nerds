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
    } else if (titulo === 'Endereço') {
      // Transformar o endereço em link do Google Maps
      const linkGoogleMaps = document.createElement('a');
      linkGoogleMaps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(valor)}`;
      linkGoogleMaps.textContent = valor;
      linkGoogleMaps.target = '_blank'; // Abrir em uma nova guia

      // Adicionar o link do Google Maps diretamente à célula da tabela
      tdElement.appendChild(linkGoogleMaps);
    } else if (titulo === 'Telefone') {
      // Formatar o número de telefone como link do WhatsApp
      const linkWhatsApp = document.createElement('a');
      linkWhatsApp.href = `https://wa.me/55${valor}`;
      linkWhatsApp.textContent = `(${String(valor).slice(0, 2)}) ${String(valor).slice(2, 7)}-${String(valor).slice(7)}`;
      linkWhatsApp.target = '_blank'; // Abrir em uma nova guia

      // Adicionar o link para o WhatsApp diretamente à célula da tabela
      tdElement.appendChild(linkWhatsApp);
    } else if (titulo === 'Status Monetário') {
      // Formatando o valor monetário
      tdElement.textContent = valor < 0 ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).toUpperCase() : valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).toUpperCase();
      if (valor < 0) {
        // Deixar em negrito, caixa alta e vermelho se o valor for menor que 0
        tdElement.style.fontWeight = 'bold';
        tdElement.style.textTransform = 'uppercase';
        tdElement.style.color = 'red';
      } else {
        // Deixar em negrito, caixa alta e verde militar se o valor for maior que 0
        tdElement.style.fontWeight = 'bold';
        tdElement.style.textTransform = 'uppercase';
        tdElement.style.color = 'green';
      }
    } else {
      // Adicionar evento de clique para copiar o conteúdo da célula para a área de transferência
      tdElement.addEventListener('click', () => {
        // Criar um elemento de texto oculto
        const hiddenInput = document.createElement('textarea');
        hiddenInput.value = valor;
        document.body.appendChild(hiddenInput);
        hiddenInput.select();
        document.execCommand('copy');
        document.body.removeChild(hiddenInput);
        
        // Alerta ou qualquer outra ação que você queira realizar após a cópia
        alert(`Conteúdo "${valor}" copiado para a área de transferência.`);
      });

      tdElement.textContent = valor;
    }

    trCliente.appendChild(tdElement); // Adicionar célula à linha do cliente
  });

  tbodyElement.appendChild(trCliente); // Adicionar a linha do cliente ao corpo da tabela


      

      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 767px) {
          /* Adiciona título especial à esquerda de cada linha */
          tbody tr::before {
            content: '${titulosOrdenados.join(" \\A ")} \\A '; /* Conteúdo do título especial com quebra de linha */
            display: table-cell; /* Permite que seja exibido como uma célula de tabela */
            text-align: right; /* Alinha o conteúdo à esquerda */
            font-weight: bold; /* Define a fonte em negrito */
            white-space: pre; /* Mantém as quebras de linha */
            line-height: 2.75; /* Espaçamento entre as linhas */
          
          }
        }
      `;
      document.head.appendChild(style);
      



     // Adicionar as células de editar e excluir ao final de cada linha
const tdAcoes = document.createElement('td'); // Crie uma célula para conter os botões
tdAcoes.classList.add('acao');

const buttonEditar = document.createElement('button');
buttonEditar.innerHTML = `<i class='bx bx-edit'></i>`;
buttonEditar.onclick = () => editItem(index);

const buttonExcluir = document.createElement('button');
buttonExcluir.innerHTML = `<i class='bx bx-trash'></i>`;
buttonExcluir.onclick = () => deleteItem(index);

// Adicione os botões à célula de ações
tdAcoes.appendChild(buttonEditar);
tdAcoes.appendChild(buttonExcluir);

// Verifique se o tamanho da tela é igual a 767 antes de adicionar os botões lado a lado
if (window.innerWidth === 767) {
  // Crie um contêiner flexível para os botões
  const divAcoes = document.createElement('div');
  divAcoes.classList.add('container-flex');

  // Adicione a célula de ações ao contêiner flexível
  divAcoes.appendChild(tdAcoes);

  // Adicione o contêiner flexível à linha do cliente
  trCliente.appendChild(divAcoes);
} else {
  // Adicione a célula de ações diretamente à linha do cliente
  trCliente.appendChild(tdAcoes);
}


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

  // Mostrar a primeira etapa
  showStep(0);
}

// Função para mostrar a etapa atual e esconder as outras
function showStep(stepIndex) {
  const steps = document.querySelectorAll('.step');
  steps.forEach(function (step, index) {
    if (index === stepIndex) {
      step.style.display = 'block';
    } else {
      step.style.display = 'none';
    }
  });
}

// Função para avançar para a próxima etapa
function goToNextStep() {
  const steps = document.querySelectorAll('.step');
  const currentStep = Array.from(steps).findIndex(step => step.style.display === 'block');
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

// Função para voltar para a etapa anterior
function goToPrevStep() {
  const steps = document.querySelectorAll('.step');
  const currentStep = Array.from(steps).findIndex(step => step.style.display === 'block');
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

// Adicionar event listeners para os botões de avançar e voltar
const nextButtons = document.querySelectorAll('.next-btn');
nextButtons.forEach(button => button.addEventListener('click', goToNextStep));

const prevButtons = document.querySelectorAll('.prev-btn');
prevButtons.forEach(button => button.addEventListener('click', goToPrevStep));

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
