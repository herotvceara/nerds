//adicionar conteudo

$(document).ready(function () {
    // ... (código existente)

    // Manipula o clique nos links do menu
    $('a[id^="link"]').on('click', function () {
        // Obtém o identificador da seção correspondente
        var sectionId = $(this).attr('id').replace('link', '');

        // Atualiza o conteúdo da div com base no identificador da seção
        $('#conteudohome').html(getContentForSection(sectionId));

        // Fecha o menu lateral (opcional)
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    // Função para obter o conteúdo com base no identificador da seção
    function getContentForSection(sectionId) {
        // Lógica para retornar o conteúdo com base no identificador
        switch (sectionId) {

            case 'Pdv':
                return '<h2>Conteúdo do PDV - Vender</h2><p>Seu conteúdo aqui...</p>';

            case 'Cliente':
                return '<h2>Conteúdo de Cadastro de Clientes</h2><p>Seu conteúdo aqui...</p>';

            case 'Item':
                return '<h2>Conteúdo de Cadastro de Itens</h2><p>Seu conteúdo aqui...</p>';
                
            case 'Fornecedor':
                return '<h2>Conteúdo de Cadastro de Fornecedores</h2><p>Seu conteúdo aqui...</p>';
            case 'ListagemPedidos':
                return '<h2>Listagem de Pedidos</h2><p>Seu conteúdo aqui...</p>';
            case 'PedidosProducao':
                return '<h2>Pedidos em Produção</h2><p>Seu conteúdo aqui...</p>';
            case 'PedidosConcluidos':
                return '<h2>Pedidos Concluídos</h2><p>Seu conteúdo aqui...</p>';
            case 'PedidosEntregue':
                return '<h2>Pedidos Entregues</h2><p>Seu conteúdo aqui...</p>';
            case 'ControleDespesas':
                return '<h2>Controle de Despesas</h2><p>Seu conteúdo aqui...</p>';
            case 'RelatorioVendas':
                return '<h2>Relatório de Vendas</h2><p>Seu conteúdo aqui...</p>';
            case 'RelatorioProcessos':
                return '<h2>Relatório de Processos</h2><p>Seu conteúdo aqui...</p>';
            case 'RelatorioGastos':
                return '<h2>Relatório de Gastos</h2><p>Seu conteúdo aqui...</p>';
            case 'MetasGanhos':
                return '<h2>Metas e Ganhos</h2><p>Seu conteúdo aqui...</p>';
            case 'Caixa':
                return '<h2>Conteúdo do Caixa</h2><p>Seu conteúdo aqui...</p>';
            case 'PontoDigital':
                return '<h2>Conteúdo do Ponto Digital</h2><p>Seu conteúdo aqui...</p>';
            // Adicione mais casos conforme necessário
            case 'Home':
                return '<h2>Resumo Diario</h2>' +
                    '<p>Valor inicial: 0,00</p>' +
                    '<p>Clientes atendidos: 0.</p>' +
                    '<div class="line"></div>' +
                    '<h2>Lorem Ipsum Dolor</h2>' +
                    '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
                    '<div class="line"></div>' +
                    '<h2>Lorem Ipsum Dolor</h2>' +
                    '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
                    '<div class="line"></div>' +
                    '<h3>Lorem Ipsum Dolor</h3>' +
                    '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
                    '</div>';
            // Adicione mais casos conforme necessário
            default:
                return '<h2>Conteúdo Padrão</h2><p>Seu conteúdo padrão aqui...</p>';
        }
    }
});


    