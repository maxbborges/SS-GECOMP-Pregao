$(document).ready(function () {
    init();
    loadMasks();
});

function init() {
    exibirDivsHidden();
    abrirCollapse();
    controleExibicao();
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

function controleExibicao(){
    ATIVIDADE = buscarAtividadeAtual()
    // ATIVIDADE = 11



    // ZERO: 0,
    // INICIO: 1,
    // AP_GERENCIA: 11,
    // AJUSTE_SC:12,
    // TRATATIVA1:13,
    // CAD_ESTIMATIVA:15,
    // PAR_ESTIMATIVA:212,
    // LANCAR_ANALISE:16,
    // FZR_NOTA:36,
    // TRATATIVA2:39,
    // AP_ANALISE:17,
    // FZR_DESPACHO:321,
    // DESPACHO1:59,
    // TRATATIVA3:217,
    // ELA_EDITAL:67,
    // DIST1:68,
    // ELA_PARECER1:78,
    // REV_PARECER:80,
    // REAL_AJUSTES:91,
    // PUB_EDITAL:111,
    // REV_CORD1:237,
    // AP_ASSESSORIA1:84,
    // REAL_SESSAO:117,


    // TRATATIVA4:102,
    // ANALISAR1:122,
    // AJUSTAR1:124,
    // DIST2:129,
    // ELA_PARECER2:131,
    // REV_PARECER:133,
    // AJUSTAR2:250,
    // REV_CORD2:253,
    // AP_ASSESSORIA2:84,
    // TRATATIVA5:146,
    // DESPACHO2:259,
    // AP_DIRETORIA1:152,
    // AP_DIRETORIA2:308,
    // ANALISAR2:155,
    // DIST3:178,
    // CAD_FORNEC:324,
    // TRATATIVA6:168,
    // LANCAR_ATA:172,
    // ELA_CONTRATO:180,
    // REV_CONTRATO:181,
    // REC_CAD_PROTHEUS1:207,
    // VIS_RESUMO1:268,
    // CAD_ASS1:265,
    // TRATATIVA8:199,
    // DIST4:205,
    // REC_CAD_PROTHEUS2:281,
    // VIS_RESUMO2:283,
    // INCLUIR_DOC:270,
    // AP_CONTRATO:285,
    // AP_PEDIDO:273,
    // EMITIR_PEDIDO: 289,
    // GERAR_PDF:291,
    // CAD_ASS2:293,
    // TRATATIVA9:303,
    // INCLUIR_PDF:299,

    if (ATIVIDADE==ACTIVITY.ZERO || ATIVIDADE==ACTIVITY.INICIO){
        // hideBlockDivs(['div_01','div_15'],['div_11','div_16'])
    }
    if (ATIVIDADE==ACTIVITY.AP_GERENCIA){
        // hideBlockDivs(['div_11'],[])
    }
    if (ATIVIDADE==ACTIVITY.AJUSTE_SC){
        
    }
    if (ATIVIDADE==ACTIVITY.TRATATIVA1){
        
    }
    if (ATIVIDADE==ACTIVITY.CAD_ESTIMATIVA){
        
    }
    if (ATIVIDADE==ACTIVITY.PAR_ESTIMATIVA){
        
    }
    if (ATIVIDADE==ACTIVITY.LANCAR_ANALISE){
        
    }
    if (ATIVIDADE==ACTIVITY.FZR_NOTA){
        
    }
    if (ATIVIDADE==ACTIVITY.TRATATIVA2){
        
    }
    if (ATIVIDADE==ACTIVITY.AP_ANALISE){
        
    }
    if (ATIVIDADE==ACTIVITY.FZR_DESPACHO){
        
    }
    if (ATIVIDADE==ACTIVITY.DESPACHO1){
        
    }
    if (ATIVIDADE==ACTIVITY.TRATATIVA3){
        
    }
    if (ATIVIDADE==ACTIVITY.ELA_EDITAL){
        
    }
    if (ATIVIDADE==ACTIVITY.ELA_PARECER1){
        
    }
    if (ATIVIDADE==ACTIVITY.DIST1){
        
    }
    if (ATIVIDADE==ACTIVITY.REV_PARECER1){
        
    }
    if (ATIVIDADE==ACTIVITY.REAL_AJUSTES){
        
    }
    if (ATIVIDADE==ACTIVITY.AP_ASSESSORIA1){
        
    }
    if (ATIVIDADE==ACTIVITY.REV_CORD1){
        
    }
    if (ATIVIDADE==ACTIVITY.AP_ASSESSORIA1){
        
    }
    if (ATIVIDADE==ACTIVITY.PUB_EDITAL){
        
    }
    if (ATIVIDADE==ACTIVITY.AP_ASSESSORIA1){
        
    }
    if (ATIVIDADE==ACTIVITY.REAL_SESSAO){
        
    }
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