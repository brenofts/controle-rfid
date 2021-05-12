click('btnCadastro', () => verificarGerente('cadastro'))

click('btnCadastroTp', () => {
	showId('opcoesTP', 'inline')
	hideIds(['opcoesUsuario','divNovaSenha'])
})

click('btnCadastroUsuario', () => {
	showId('opcoesUsuario', 'inline')
	hideIds(['opcoesTP','divNovaSenha'])
})

click('btnNovaSenha', () => {
	console.log('nova senha')
	hideIds(['divNovoUsuario','divAtualizarUsuario'])
	showId('divNovaSenha','flex')
})

click('btnNovoUsuario', () => {
	showId('divNovoUsuario', 'flex')
	hideIds(['divNovaSenha','divAtualizarUsuario'])
})

click('btnAtualizarUsuario', () => {
	console.log('atualizar usuário')
	hideIds(['divNovaSenha','divNovoUsuario'])
	showId('divAtualizarUsuario','flex')
})

click('btnNovoTP', () => {
	console.log('novo tp')
})

click('btnAtualizarTP', () => {
	console.log('atualizar tp')
})

