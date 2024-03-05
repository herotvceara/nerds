// Referência à coleção "Clientes" no Firestore
var clientesCollection = firebase.firestore().collection('Clientes');

// Obter todos os documentos da coleção "Clientes"
clientesCollection.get().then((querySnapshot) => {
  // Verificar se há documentos na coleção
  if (!querySnapshot.empty) {
    // Obter o primeiro documento
    const primeiroCliente = querySnapshot.docs[0];

    // Obter os títulos dos campos do primeiro cliente
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
  } else {
    console.log('A coleção "Clientes" está vazia.');
  }
}).catch((error) => {
  console.error('Erro ao obter documentos:', error);
});
