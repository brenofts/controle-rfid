// Fazer a leitura da TAG de gerente para devolução

inputTagGerente.addEventListener('input', () => {
	tagGerente = inputTagGerente.value
	if (tagGerente.length == 10) {
		clearInterval(stopFocusGerente)
		db.ref('usuarios')
			.once('value')
			.then(snap => {
				var resultado = Object.values(snap.val())
				function encontrarUsuario(item) {
					return item.tag == tagGerente
				}
				var usuarioEncontrado = resultado.find(encontrarUsuario)
				gerente = usuarioEncontrado.id
				var ehGerente = usuarioEncontrado.gerente
				if (ehGerente == true) {
					ajustarHora()
						.then(() => devolver(id, matricula, tp, posto, gerente))
						.catch(e => {
							alert(e)
							reload()
						})
				} else {
					if (ehGerente == false) {
						alert('Operação autorizada somente para gerentes')
						reload()
					}
				}
			})
			.catch(error => {
				if (error.message.includes('contains NaN')) {
					alert('Não foi possível realizar o registro de devolução.')
					reload()
				} else {
					if (error.message.includes('Cannot read property')) {
						alert('TAG não cadastrada')
						reload()
					} else {
						alert('Algo deu errado: ' + error.message)
						reload()
					}
				}
				console.log(error.message)
			})
	}
})

// function verificarFusoDevolver() {
// 	if (new Date().getTimezoneOffset() == 180) {
// 		devolver(id, matricula, tp, posto, gerente)
// 	} else {
// 		alert('Verificar configuração de fuso horário deste computador.')
// 		reload()
// 	}
// }

function devolver(i, m, t, p, g) {
	var registro = {
		status: 'Devolvido',
		id: i,
		matricula: m,
		tp: t,
		posto: p,
		gerente: g,
		data: new Date().getTime() + diferencaHora,
	}

	chave = db.ref().child('historico').push().key
	// cria uma variável vazia do tipo objeto
	var updates = {}
	// cria um item nesse objeto updates[item] = "valor do item"
	// seria updates = {
	//  /tps/tp/status : registro,
	//  /historico/contador : registro,
	//  /usuarios/id/livre : true
	// }
	updates['/tps/' + t + '/status/'] = registro
	updates['/historico/' + chave] = registro
	// bloqueia ou libera o usuario

	updates['/usuarios/' + i.replace('.', '_') + '/livre/'] = true
	updates['/usuarios/' + i.replace('.', '_') + '/tp/'] = '-'
	msgAlert = `
		<p>${t} devolvido por ${i} para ${g} em ${p}</p><p> ${new Date(registro.data).toLocaleString()} </p><p>Registro ${chave} </p>
	`
	mensagem = t + ' devolvido por ' + i + ' para ' + g + ' em ' + p + '<br>' + new Date(registro.data).toLocaleString()
	email = i + '@metro.df.gov.br,' + g + '@metro.df.gov.br'
	fetchUrl = url + '?mensagem=' +  mensagem + '&email=' + email + '&chave=' + chave

	// retorna chamando o firebase para escrever as atualizacoes
	return firebase
		.database()
		.ref()
		.update(updates)
		.then(fetch(encodeURI(fetchUrl), header).then((response) => {
			console.log(response)
		}).catch(e => alert('Erro ao enviar e-mail: ' + e)))
		.then(() => {
			showAlert(msgAlert)
		})
		.catch(e => alert(e.message))
}

click('btnDevolver', () => {
	clearInterval(stopFocusGerente)
	hideId('divFormRFIDDevolver')
	showId('divFormSenhaDevolver', 'block')
})

click('utilizarTagDev', () => {
	focusGerente()
	showId('divFormRFIDDevolver', 'block')
	hideId('divFormSenhaDevolver')
})