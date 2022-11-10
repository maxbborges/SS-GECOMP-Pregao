$(document).ready(function () {
    init();
    loadMasks();
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

//=========================================================== SELECTED/REMOVED ZOOM ===========================================================

function setSelectedZoomItem(selectedItem) {   
	

	switch (selectedItem.inputName) {
	case "zf_01_cnpjFilial":
		
		var txt_01_codFilial = selectedItem["Code"];
		$('[name="txt_01_codFilial"]').val(txt_01_codFilial);
		
		var txt_01_nmFilial = selectedItem["Description"];
		$('[name="txt_01_nmFilial"]').val(txt_01_nmFilial);
		break;
		
	case "zf_01_nSC":
		var row = wdkAddChild('tb_itensSC');
		
		$('[name="item_01_nSC___'+row+'"]').val(selectedItem["C1_NUM"]);
		$('[name="item_01_desc___'+row+'"]').val(selectedItem["C1_DESCRI"]);
		$('[name="item_01_cod___1'+row+'"]').val(selectedItem["C1_CONTA"]);
		$('[name="item_01_qtd___'+row+'"]').val(selectedItem["C1_QUANT"].split(".")[0]);
		$('[name="item_01_cc___'+row+'"]').val(selectedItem["C1_CC"]);
		$('[name="item_01_proj___'+row+'"]').val(selectedItem["C1_CLVL"]);
		$('[name="item_01_prog___'+row+'"]').val(selectedItem["C1_EC06DB"]);
		$('[name="item_01_subprog___'+row+'"]').val(selectedItem["C1_EC07DB"]);
		$('[name="item_01_grupoOrc___'+row+'"]').val(selectedItem["C1_EC08DB"]);
		$('[name="item_01_conselho___'+row+'"]').val(selectedItem["C1_EC05DB"]);
	
		/*MASKS*/
		MaskEvent.init();
		$('.number').mask("000000000000009", {reverse: true});
				
		break

	}
}

function removedZoomItem(removedItem) {

	switch (removedItem.inputName) {
	case "zf_01_cnpjFilial":
		
		$('[name="txt_01_codFilial"]').val("");
		$('[name="txt_01_nmFilial"]').val("");
		break;
	case "zf_01_nSC":
		$("input[name^='item_01_nSC___']").each(function(index, value){

	        fnWdkRemoveChild(this);

		})

	}
}
//=========================================================== NEW ITEM AN. MERCADO ===========================================================
function addNewItemSC(){

	var row = wdkAddChild('tb_16_itensSC');
	
	var zf_16_cnpj = $("#zf_16_cnpj").text();
	var zf_16_descricaoItem = $("#zf_16_descricaoItem").text();
	
	var txt_16_quantitativo = $("input[name='txt_16_quantitativo']").val();
	var txt_16_vlUnitario = $("input[name='txt_16_vlUnitario']").val();
	var txt_16_vlTotal = $("input[name='txt_16_vlTotal']").val();
	
	$("input[name^='item_16_empresa___"+row+"']").val(zf_16_cnpj);
	$("textarea[name^='item_16_descricao___"+row+"']").val(zf_16_descricaoItem);
	$("input[name^='item_16_quantitativo___"+row+"']").val(txt_16_quantitativo);
	$("input[name^='item_16_vlUnitario___"+row+"']").val(txt_16_vlUnitario);
	$("input[name^='item_16_vlTotal___"+row+"']").val(txt_16_vlTotal);
	
	window['zf_16_cnpj'].clear();
	window['zf_16_descricaoItem'].clear();
	
	var txt_16_quantitativo = $("input[name='txt_16_quantitativo']").val('');
	var txt_16_vlUnitario = $("input[name='txt_16_vlUnitario']").val('');
	var txt_16_vlTotal = $("input[name='txt_16_vlTotal']").val('');
	
	
}