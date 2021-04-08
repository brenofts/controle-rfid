click('btnCadastro', () => {
	hideId('inicio')
	hideId('busca')
	hideId('controle')
	showId('opcoes', 'inline')
	showId('cadastro', 'flex')
})

click('btnCadastroTp', () => {
	showId('opcoesCadastro', 'inline')
	tpOuEmpregado.innerText = 'TP'
	hideId('divNovoEmpregado')
})

click('btnCadastroEmpregado', () => {
	showId('opcoesCadastro', 'inline')
	tpOuEmpregado.innerText = 'Empregado'
})

click('btnNovoCadastro', () => {
	if (tpOuEmpregado.innerText == 'Empregado') {
		showId('divNovoEmpregado', 'flex')
	}
	if (tpOuEmpregado.innerText == 'TP') {
		console.log('novo tp')
	}
})

click('btnAtualizarCadastro', () => {
	if (tpOuEmpregado.innerText == 'Empregado') {
		console.log('atualizar empregado')
		hideId('divNovoEmpregado')
	}
	if (tpOuEmpregado.innerText == 'TP') {
		console.log('atualizar tp')
	}
})

