$(document).ready(function () {
    init();
});

function init() {
    console.log("OK")
    exibirDivsHidden()
    abrirCollapse()
    // initDataTableWbc()
    // initDataTableValorUnitario()
}

function initDataTableWbc() {
    dataInit2=''
    var tabelaWbc = FLUIGC.datatable('#dataTable_wbc', {
        dataRequest: [
            { "item": "1234", "codigo": "Maxwell", "descricao": "DF", "quantidade": "DF", "wbc": "teste" }, 
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },
            { "item": "tes", "codigo": "ma", "descricao": "desc", "quantidade": "DaaF", "wbc": "tax" },],
        renderContent: [
            'item', 
            'codigo', 
            'descricao', 
            'quantidade', 
            'wbc'],
        header: [
            { 'title': 'Item' }, 
            { 'title': 'Código' }, 
            { 'title': 'Descrição' }, 
            { 'title': 'Quantidade' }, 
            { 'title': 'WBC' }],
        search: {
            enabled: true,
            onlyEnterkey: true,
            onSearch: function (res) {
                if (!res) { tabelaWbc.reload(dataInit2); }
                var search = (tabelaWbc.getData()).filter(function (el) {
                    return el.item.toUpperCase().indexOf(res.toUpperCase()) >= 0
                        || el.codigo.toUpperCase().indexOf(res.toUpperCase()) >= 0
                        || el.descricao.toUpperCase().indexOf(res.toUpperCase()) >= 0
                        || el.quantidade.toUpperCase().indexOf(res.toUpperCase()) >= 0
                        || el.wbc.toUpperCase().indexOf(res.toUpperCase()) >= 0;
                });
                if (search && search.length) { tabelaWbc.reload(search); }
                else {
                    FLUIGC.toast({
                        title: 'Searching: ',
                        message: 'No results',
                        type: 'success'
                    });
                }
            }
        },
        navButtons: { enabled: false },
        scroll: {
            target: "#dataTable_wbc",
            enabled: true
        },
        actions: {
            enabled: false,
            template: '.template_datatable_edit',
            actionAreaStyle: 'col-md-6'
        },
        navButtons: {
            enabled: true,
            forwardstyle: 'btn-warning',
            backwardstyle: 'btn-warning',
        },
        draggable: {
            enabled: false
        },
    }, function (err, data) {
        if (data) { dataInit2 = data; }
        else if (err) {
            FLUIGC.toast({
                message: err,
                type: 'danger'
            });
        }
    });

    tabelaWbc.on('fluig.datatable.onselectrow', function (data) {
        var selected = tabelaWbc.getRow(data.selectedIndex[0]);
        console.log(selected)

        FLUIGC.modal({
            title: 'Title',
            content: '<input type="text" value="' + selected.item + '" readonly>' +
                '<input type="text" value="' + selected.codigo + '" readonly>' +
                '<input type="text" value="' + selected.descricao + '" readonly>'+
                '<input type="text" value="' + selected.quantidade + '" readonly>' +
                '<input type="text" value="' + selected.wbc + '" id="teste">',
            id: 'fluig-modal',
            size: 'small',
            actions: [{
                'label': 'Save',
                'bind': 'data-save-wbc',
                'autoClose': true
            }, {
                'label': 'Close',
                'autoClose': true
            }]
        }, function (err, data) {
            if (err) {
                // do error handling
            } else {
                // do something with data
            }
        });

        $('[data-save-wbc]').on('click', function () {
            var editedRow = {
                item: selected.item,
                codigo: selected.codigo,
                descricao: selected.descricao,
                quantidade: selected.quantidade,
                wbc: $('#teste').val()
            };
            tabelaWbc.updateRow(tabelaWbc.selectedRows()[0], editedRow);
        })
    });
}

function initDataTableValorUnitario() {
    dataInit1=''
    var tabelaValorUnitario = FLUIGC.datatable('#dataTable_valorUnitario', {
        dataRequest: [{ "item": "1234", "codigo": "Maxwell", "descricao": "DF", "fornecedor": "DF", "quantidade": "DF", "valorUnitario": "ddda", "valorTotal": "DF" }, { "item": "1234", "codigo": "Maxwell", "descricao": "DF", "fornecedor": "DF", "quantidade": "DF", "valorUnitario": "bbbb", "valorTotal": "DF" }],
        renderContent: ['item', 'codigo', 'descricao', 'fornecedor', 'quantidade', 'valorUnitario', 'valorTotal'],
        header: [{ 'title': 'item' }, { 'title': 'Código' }, { 'title': 'Descrição' }, { 'title': 'Fornecedor' }, { 'title': 'Quantidade' }, { 'title': 'Valor Unitário' }, { 'title': 'Valor Total' }],
        search: {
            enabled: true,
            onlyEnterkey: true,
            onSearch: function (res) {
                if (!res) { tabelaValorUnitario.reload(dataInit1); }
                var search = (tabelaValorUnitario.getData()).filter(function (el) {
                    return el.item.toUpperCase().indexOf(res.toUpperCase()) >= 0
                    || el.codigo.toUpperCase().indexOf(res.toUpperCase()) >= 0
                    || el.descricao.toUpperCase().indexOf(res.toUpperCase()) >= 0
                    || el.fornecedor.toUpperCase().indexOf(res.toUpperCase()) >= 0
                    || el.quantidade.toUpperCase().indexOf(res.toUpperCase()) >= 0
                    || el.valorUnitario.toUpperCase().indexOf(res.toUpperCase()) >= 0
                    || el.valorTotal.toUpperCase().indexOf(res.toUpperCase()) >= 0;
                });
                if (search && search.length) { tabelaValorUnitario.reload(search); }
                else {
                    FLUIGC.toast({
                        title: 'Searching: ',
                        message: 'No results',
                        type: 'success'
                    });
                }
            }
        },
        navButtons: { enabled: false },
        scroll: {
            target: "#dataTable_valorUnitario",
            enabled: true
        },
        actions: {
            enabled: true,
            template: '.template_datatable_edit',
            actionAreaStyle: 'col-md-6'
        },
        navButtons: {
            enabled: true,
            forwardstyle: 'btn-warning',
            backwardstyle: 'btn-warning',
        },
        draggable: {
            enabled: false
        },
    }, function (err, data) {
        if (data) { dataInit1 = data; }
        else if (err) {
            FLUIGC.toast({
                message: err,
                type: 'danger'
            });
        }
    });

    tabelaValorUnitario.on('fluig.datatable.onselectrow', function (data) {
        var selected = tabelaValorUnitario.getRow(data.selectedIndex[0]);
        console.log(selected)

        FLUIGC.modal({
            title: 'Title',
            content: '<input type="text" value="' + selected.item + '" readonly>' +
                '<input type="text" value="' + selected.codigo + '" readonly>' +
                '<input type="text" value="' + selected.descricao + '" readonly>'+
                '<input type="text" value="' + selected.fornecedor + '" readonly>'+
                '<input type="text" value="' + selected.quantidade + '" readonly>' +
                '<input type="text" value="' + selected.valorUnitario + '" id="teste">'+
                '<input type="text" value="' + selected.valorTotal + '" readonly>',
            id: 'fluig-modal',
            size: 'small',
            actions: [{
                'label': 'Save',
                'bind': 'data-save-valorUnitario',
                'autoClose': true
            }, {
                'label': 'Close',
                'autoClose': true
            }]
        }, function (err, data) {
            if (err) {
                // do error handling
            } else {
                // do something with data
            }
        });

        $('[data-save-valorUnitario]').on('click', function () {
            var editedRow = {
                item: selected.item,
                codigo: selected.codigo,
                descricao: selected.descricao,
                fornecedor: selected.fornecedor,
                quantidade: selected.quantidade,
                valorUnitario: $('#teste').val(),
                valorTotal: selected.valorTotal,
            };
            tabelaValorUnitario.updateRow(tabelaValorUnitario.selectedRows()[0], editedRow);
        })
    });
}