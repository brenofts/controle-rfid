click('btnCadastro', () => {
	verificarGerente()
	hideIds(['busca', 'controle', 'transporte'])
	showId('cadastro', 'flex')
})



click('btnCadastroTp', () => {
	showId('opcoesTP', 'inline')
	hideId('opcoesUsuario')
})

click('btnCadastroUsuario', () => {
	showId('opcoesUsuario', 'inline')
	hideId('opcoesTP')
})

click('btnNovaSenha', () => {
	console.log('nova senha')
	hideId('divNovoUsuario')
})

click('btnNovoUsuario', () => {
	showId('divNovoUsuario', 'flex')
})

click('btnAtualizarUsuario', () => {
	console.log('atualizar usuário')
	hideId('divNovoUsuario')
})

click('btnNovoTP', () => {
	console.log('novo tp')
})

click('btnAtualizarTP', () => {
	console.log('atualizar tp')
})

