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
// Modal de cadastro de cliente
const modalCadastroCliente = document.querySelector('.modalcadcliente-container');
const modalCadastroClienteForm = document.getElementById('modalCadastroClienteForm');

// Objeto para armazenar os dados do cliente
const novoCliente = {};

// Variável para acompanhar a etapa atual
let currentStepIndex = 0;

// Adicionar evento de clique para o botão "Novo Cliente"
const btnNovoCliente = document.getElementById('new');
btnNovoCliente.addEventListener('click', openModalCadastroCliente);

// Função para abrir o modal de cadastro de cliente
function openModalCadastroCliente() {
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

  // Adicionar as etapas ao formulário no modal
  const stepsData = [
    {
      id: 'step1',
      title: 'Passo 1: Adicione o nome do Cliente',
      inputs: [{ type: 'text', placeholder: 'Nome do Cliente', id: 'nome' }],
      buttons: [{ text: 'Avançar', type: 'button', class: 'next-btn' }]
    },
    {
      id: 'step2',
      title: 'Passo 2: Telefone e Endereço',
      inputs: [
        { type: 'text', placeholder: 'Telefone', id: 'telefone' },
        { type: 'text', placeholder: 'Endereço', id: 'endereco' }
      ],
      buttons: [
        { text: 'Corrigir Nome', class: 'prev-btn' },
        { text: 'Complementar Cadastro', type: 'button', class: 'next-btn' },
        { text: 'Concluir', type: 'button', class: 'btnSalvar' }
      ]
    },
    {
      id: 'step3',
      title: 'Passo 3: CPF e Data de Nascimento',
      inputs: [
        { type: 'text', placeholder: 'CPF', id: 'cpf' },
        { type: 'text', placeholder: 'Data de Nascimento', id: 'dataNascimento' }
      ],
      buttons: [
        { text: 'Voltar', class: 'prev-btn' },
        { text: 'Concluir', type: 'button', class: 'btnSalvar' }
      ]
    }
  ];

  stepsData.forEach(stepData => {
    const stepElement = document.createElement('div');
    stepElement.classList.add('step');
    stepElement.id = stepData.id;

    const titleElement = document.createElement('h2');
    titleElement.textContent = stepData.title;
    stepElement.appendChild(titleElement);

    stepData.inputs.forEach(inputData => {
      const inputElement = document.createElement('input');
      inputElement.type = inputData.type;
      inputElement.placeholder = inputData.placeholder;
      inputElement.id = inputData.id;
      stepElement.appendChild(inputElement);
    });

    stepData.buttons.forEach(buttonData => {
      const buttonElement = document.createElement('button');
      buttonElement.textContent = buttonData.text;
      buttonElement.classList.add(buttonData.class);
      buttonElement.type = 'button'; // Definindo todos os botões como type "button"
      stepElement.appendChild(buttonElement);
    });

    modalCadastroClienteForm.appendChild(stepElement);
  });

  // Exibir o modal
  modalCadastroCliente.classList.add('active');

  // Mostrar a primeira etapa
  showStep(currentStepIndex);
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
  const inputs = document.querySelectorAll('.step.active input');
  inputs.forEach(input => {
    novoCliente[input.id] = input.value;
  });

  if (currentStepIndex < 2) {
    currentStepIndex++;
    showStep(currentStepIndex);
  }
}

// Função para voltar para a etapa anterior
function goToPrevStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    showStep(currentStepIndex);
  }
}

// Adicionar event listeners para os botões de avançar e voltar
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('next-btn')) {
    goToNextStep();
  } else if (event.target.classList.contains('prev-btn')) {
    goToPrevStep();
  } else if (event.target.classList.contains('btnSalvar')) { // Adicionar lógica para o botão de salvar
    saveCliente();
  }
});

// Função para salvar o cliente (ajuste conforme necessário)
function saveCliente() {
  // Exibir os dados do cliente no console
  console.log('Dados do cliente:', novoCliente);

  // Limpar os dados do cliente após salvar
  for (const prop in novoCliente) {
    delete novoCliente[prop];
  }

  // Fechar o modal após salvar
  closeModalCadastroCliente();
}

// Função para fechar o modal e limpar o conteúdo
function closeModalCadastroCliente() {
  currentStepIndex = 0;
  modalCadastroCliente.classList.remove('active');
  modalCadastroClienteForm.innerHTML = '';
}
