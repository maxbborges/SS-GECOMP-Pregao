function displayFields(form,customHTML){ 
	recuperarAtividadeJS(form, customHTML);
	
	var atividade = getValue("WKNumState");
	
	if(atividade == "0" || atividade == "1"){	
				
		usuarioLogado = buscarUsuarioLogado();
		
		form.setValue("txt_01_dtSolicitacao", buscaDataAtual());
		form.setValue("txt_01_solicitacao", usuarioLogado.nome);
		form.setValue("txt_01_email", usuarioLogado.mail);
		
		var txt_00_nProcesso = form.getValue(txt_00_nProcesso);
		
		if(txt_00_nProcesso == undefined || txt_00_nProcesso == ""){
			form.setValue("txt_01_nProcesso", getSequencial());
		}
		
		form.setValue("txt_01_unidade", getUnidadeCoord(usuarioLogado.mail));
	}
}

function recuperarAtividadeJS(form, customHTML) {

	customHTML.append("<script>function buscarUsuarioLogado(){return " + "'" + getValue('WKUser') + "'" + ";}</script>");
	customHTML.append("<script>function buscaEmpresa(){return " + getValue('WKCompany') + ";}</script>");
	customHTML.append("<script>function buscarAtividadeAtual(){return " + getValue("WKNumState") + ";}</script>");
	customHTML.append("<script>function buscarModoForm(){return '" + form.getFormMode() + "';}</script>");
	customHTML.append("<script>function buscarIdSolicitacao(){return " + "'" + getValue('WKNumProces') + "'" + ";}</script>");

}

function getSequencial(){
	log.info('solicitação de pregão - getSequencial ini');
	var seq = 0;
	var ano = obterDataCorrente().split('/')[2];
	var parametros = [ 
		DatasetFactory.createConstraint("escopo", 'compras', null, ConstraintType.MUST)
		, DatasetFactory.createConstraint("ano", ano, null, ConstraintType.MUST)
	];
	var maxIdentificador = DatasetFactory.getDataset("fluig_sequencial", [], parametros, []);
	if(maxIdentificador != null && maxIdentificador.rowsCount > 0){
		seq = maxIdentificador.getValue(0, "sequencial_ano");
	}
	log.info('solicitação de pregão - getSequencial: ' + seq);
	return seq;
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
}

function getUnidadeCoord(email){
	var unidade = "98870769534";
	
	var parametros = [ 
		DatasetFactory.createConstraint("email", email, email, ConstraintType.MUST)
	]
	var dataset = DatasetFactory.getDataset("protheus_consultar_usuarios", null, parametros, null);
	
	if(dataset.rowsCount > 0){
		txt_00_unidade = dataset.getValue(0, "department");
	}
	
	return unidade;
	
}