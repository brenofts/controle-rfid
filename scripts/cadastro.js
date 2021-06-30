click('btnCadastro', () => verificarGerente('cadastro'))

click('btnCadastroTp', () => {
	showId('cadastroTp', 'inline')
	hideIds(['opcoesUsuario', 'divNovaSenha'])
})

click('btnCadastroUsuario', () => {
	showId('opcoesUsuario', 'inline')
	hideIds(['cadastroTp', 'divNovaSenha'])
})

click('btnNovoUsuario', () => {
//	showId('divNovoUsuario', 'flex')
	hideIds(['divNovaSenha', 'divAtualizarUsuario'])
	alert('Procure os desenvolvedores!')
})

click('btnNovoTP', () => {
	console.log('novo tp')
	alert('Procure os desenvolvedores')
})

click('btnAtualizarTP', () => {
	console.log('Chama ')
	alert('Procure os desenvolvedores')
})

// Atualizar cadastro (TAG e função)
// Atualizar TAG

click('btnAtualizarUsuario', () => {
	console.log('atualizar usuário')
	hideIds(['divNovaSenha', 'divNovoUsuario'])
	showId('divAtualizarUsuario', 'flex')
	inputMatrAtualiza.focus()
	click('lerMatr', () => {
		var leuMatr = document.getElementById('inputMatrAtualiza').value
		if (leuMatr.length > 2) {
			db.ref('usuarios')
				.once('value')
				.then(snap => {
					var leuUsuario = Object.values(snap.val())
					function matr(usu) {
						return usu.matricula == leuMatr
					}
					var usuarioEncontrado = leuUsuario.find(matr)
					if (usuarioEncontrado != undefined) {
						idEncontrado.innerText = usuarioEncontrado.id
						showId('botoesTagGer', 'inline')
						hideId('lerMatr')
						hideId('formAtualizarUsuario')
						click('trocaGerente', () => {
							if (usuarioEncontrado.gerente == true) {
								if (window.confirm('Deseja retirar a credencial de gerente do usuário ' + usuarioEncontrado.id + '?')) {
									ajustarHora()
										.then(() => {
											chave = db.ref().child('/usuarios').push().key
											var momentoRegistro = new Date().getTime() + diferencaHora
											var updates = {}
											updates['/usuarios/' + usuarioEncontrado.id.replace('.', '_') + '/gerente'] = false
											updates[
												'/usuarios/' +
													usuarioEncontrado.id.replace('.', '_') +
													'/atualizacoes/gerente/' +
													chave
											] = {
												atualizacao: 'Retirada da credencial de gerente',
												data: momentoRegistro,
												gerente: gerente,
												posto: posto,
											}
											mensagem = 'Registro: Retirada da credencial de Gerente do empregado ' + usuarioEncontrado.id + ', no posto '+ posto + ' em ' + new Date(momentoRegistro).toLocaleString()
											email = usuarioEncontrado.id + '@metro.df.gov.br'
											fetchUrl = url + '?mensagem=' + mensagem + '&email=' + email + '&chave=' + chave
											return db
												.ref()
												.update(updates)
												.then(
													fetch(encodeURI(fetchUrl), header)
													.then(response => {
													console.log(response)
												})
													.catch(e => alert('Erro ao enviar e-mail: ' + e))
													)
													.then(() => {alert("Cadastro de "+ usuarioEncontrado.id + " atualizado com Sucesso.")
												reload()})
													.catch(e => alert(e.message))
										})
										.catch(e => alert(e))
								} else {
									console.log('negativo')
								}
							} else {
								if(usuarioEncontrado.gerente == false){
									if(window.confirm("Deseja conceder credencial de gerente ao empregado " + usuarioEncontrado.id + "?")) {
										ajustarHora()
										.then(() => {
											chave = db.ref().child('/usuarios').push().key
											var momentoRegistro = new Date().getTime() + diferencaHora
											var updates = {}
											updates['/usuarios/' + usuarioEncontrado.id.replace('.', '_') + '/gerente'] = true
											updates[
												'/usuarios/' +
													usuarioEncontrado.id.replace('.', '_') +
													'/atualizacoes/gerente/' +
													chave
											] = {
												atualizacao: 'Conceissão da credencial de gerente',
												data: momentoRegistro,
												gerente: gerente,
												posto: posto,
											}
											mensagem = 'Registro: Concedida credencial de Gerente no Sistema de Controle de TPs ao empregado ' + usuarioEncontrado.id + ', no posto '+ posto + ' em ' + new Date(momentoRegistro).toLocaleString()
											email = usuarioEncontrado.id + '@metro.df.gov.br'
											fetchUrl = url + '?mensagem=' + mensagem + '&email=' + email + '&chave=' + chave
											return db
												.ref()
												.update(updates)
												.then(
													fetch(encodeURI(fetchUrl), header)
													.then(response => {
													console.log(response)
												})
													.catch(e => alert('Erro ao enviar e-mail: ' + e))
													)
													.then(() => {alert("Cadastro de "+ usuarioEncontrado.id + " atualizado com Sucesso.")
												reload()})
													.catch(e => alert(e.message))
										})
										.catch(e => alert(e))
									} else {alert('não')}
								}
							}
						})
						click('trocaTag', () => {
							hideId('botoesTagGer')
							showId('divTagAtualiza', 'flex')
							focusTrocaTag()
							inputTagAtualiza.addEventListener('input', () => {
								if (inputTagAtualiza.value.length == 10) {
									var novaTag = inputTagAtualiza.value
									clearInterval(stopFocusTagAtualiza)
									db.ref('tps')
										.once('value')
										.then(snap => {
											var listaTp = Object.values(snap.val())
											function tagTp(t) {
												return t.tag == novaTag
											}
											var tagEncontradaTp = listaTp.find(tagTp)
											function tagUsu(item) {
												return item.tag == novaTag
											}
											var tagEncontradaUsu = leuUsuario.find(tagUsu)
											console.log(tagEncontradaTp, tagEncontradaUsu)
											if (tagEncontradaTp == undefined && tagEncontradaUsu == undefined) {
												console.log('TAG disponível')
												db.ref('/usuarios/' + usuarioEncontrado.id.replace('.', '_') + '/tag')
													.set(novaTag)
													.then(() => {
														alert('A Tag do Usuário: ' + usuarioEncontrado.id + ' foi atualizada com sucesso.')
														reload()
													})
													.catch(e => alert(e.message))
											} else {
												if (tagEncontradaTp != undefined) {
													inputTagAtualiza.value = ''
													setTimeout(() => {
														alert('TAG já utilizada para o TP ' + tagEncontradaTp.tp + '. Apresente uma nova TAG')
													}, 100)
													escondeBotoes()
												} else {
													if (tagEncontradaUsu != undefined) {
														inputTagAtualiza.value = ''
														setTimeout(() => {
															alert(
																'TAG já utilizada para o usuário ' + tagEncontradaUsu.id + '. Apresente uma nova TAG'
															)
														}, 100)
														escondeBotoes()
													}
												}
											}

										})
										.catch(e => alert(e.message))
								}
							})
						})
						click('voltarTag', () => {
							idEncontrado.innerText = ''
							document.getElementById('inputMatrAtualiza').value = ''
							showId('lerMatr', 'flex')
							hideId('botoesTagGer')
							document.getElementById('inputMatrAtualiza').focus()
							showId('formAtualizarUsuario', 'flex')
						})
					} else {
						alert('Matrícula não encontrada')
					}
				})
		} else {
			alert('Digite Corretamente a Matrícula!')
		}
	})
})

const focusTrocaTag = () => {
	window.stopFocusTagAtualiza = setInterval(() => {
	if (inputTagAtualiza != document.activeElement) {
			inputTagAtualiza.focus()
			console.log('focusTagAtualiza')
		}
	}, 100)
}

function escondeBotoes() {
	setTimeout(() => {
		hideId('botoesTagGer')
	}, 300)
}

//OBSERVAÇÕES TP: Permite ler se existe alguma observação ou escrever alguma observação sobre as condições do aparelho.

click('btnObsTP', () =>{
	showId("divObsTp", "flex")
	inputObsNumTP.focus()
})
click('btnVoltarObsTp',()=>{
	showId("inputObsNumTP","flex")
	hideId("divBotoesObs")
	inputObsNumTP.focus()
	inputObsNumTP.value = ""

})

var registroObs = {}
var aparelhoEncontrado ={}
inputObsNumTP.addEventListener("input",()=>{
	registroObs['gerente'] = gerente
	if (inputObsNumTP.value.length == 5){
		var tpObs = inputObsNumTP.value
		db.ref('tps')
		.once('value')
		.then(snap => {
			var listaTp = Object.values(snap.val())
			function numTp(n) {
			return n.tp == tpObs
			}
			var tpEncontrado = listaTp.find(numTp)
			aparelhoEncontrado = tpEncontrado
			if (tpEncontrado != undefined) {
				var ultimaData = new Date(tpEncontrado.status.data).toLocaleString()
				registroObs['ultimo_registro'] = tpEncontrado.status
				tp = tpEncontrado.tp
				console.log(registroObs)
				document.getElementById("mostraNumTPobs").innerHTML = "TP: "+ tpObs
				if (tpEncontrado.status.status == 'Em uso'){
					document.getElementById('infoTPobs').innerHTML = `
					<p>Patrimônio: ${tpEncontrado.pat}</p>
					<p>Informações do último registro:</p>
					<p>Data: ${ultimaData}</p>
					<p>Posto: ${tpEncontrado.status.posto}</p>
					<p>Usuário: ${tpEncontrado.status.id}</p>
					<p>Status: ${tpEncontrado.status.status}</p>
					<p>Gerente: ${tpEncontrado.status.gerente}</p>
				`
						if (confirm("O TP " + tpEncontrado.tp + " encontra-se registrado para o usuário " + tpEncontrado.status.id + ". Deseja realmente continuar?" )){
							null
						} else {
							reload()
						}
				} else if(tpEncontrado.status.status == 'Bloqueado') {
					document.getElementById('infoTPobs').innerHTML = `
					<p>Patrimônio: ${tpEncontrado.pat}</p>
					<p>Informações do último registro:</p>
					<p>Data: ${ultimaData}</p>
					<p>Posto: ${tpEncontrado.status.posto}</p>
					<p>Usuário: ${tpEncontrado.status.id}</p>
					<p>Status: ${tpEncontrado.status.status}</p>
					<p>Gerente: ${tpEncontrado.status.gerente}</p>
				`
					document.getElementsByName('bloquear')[1].checked = true
					document.getElementById('opcoesBloquear').style.display = 'none'
				}
				hideId('inputObsNumTP')
				showId('divBotoesObs', 'flex')
			} else {
				alert("TP: "+ tpObs + ", não encontrado.")
				inputObsNumTP.value = ""
			}
		})
	} 
})

var bloquear = false

document.getElementById('escreveObs').addEventListener('click', () => {
	var observacoes = document.getElementById('inputObservacao').value
	registroObs['obs'] = observacoes
	if (observacoes.length >= 20) {
		if (document.getElementsByName('bloquear')[0].checked == true) {
			registroObs['bloquear'] = 'sim'
			bloquear = true
			registrarObs()
		} else if (document.getElementsByName('bloquear')[1].checked == true) {
				registroObs['bloquear'] = 'nao'
				bloquear = false
				registrarObs()
		} else if (document.getElementsByName('bloquear')[0].checked == false && document.getElementsByName('bloquear')[1].checked == false ){
			alert('O campo "Bloquear?" deve ser marcado')
		}
	} else {
		alert('Preencha o campo de observações com pelo menos 20 caracteres')
	}
})

function registrarObs() {
	ajustarHora().then(() => {
		registroObs['data'] = new Date().getTime() + diferencaHora
		registroObs['posto'] = posto
		if (bloquear) {
			var updates = {}
			var registro = {
				status: 'Bloqueado',
				id: '-',
				tp: tp,
				posto: posto,
				gerente: gerente,
				data: new Date().getTime() + diferencaHora,
			}
			chave = db.ref().child('tps').push().key

			updates['/historico/' + chave] = registro
			updates['/tps/' + tp + '/status/'] = registro
			updates['/tps/' + tp + '/obs/' + chave] = registroObs

			return db.ref().update(updates).then(() => {
				alert('Observação registrada com sucesso. O TP ' + tp + ' está bloqueado para novos registros')
				reload()
			}).catch(e => {
				alert(e.message)
				reload()
			})
		} else {
			chave = db.ref().child('tps').push().key
			db.ref('tps/' + tp + '/obs/' + chave).set(registroObs).then(() => {
				alert('Observação registrada com sucesso')
				reload()
			}).catch(e => {
				alert(e.message)
				reload()
			})
		}
	}).catch(e => {
		alert(e)
		reload()
	})
}

click('btnEscreverObsTP', () => {
	showId("divEscreveObs","flex")
	hideId('divBotoesObs')
})
click('btnMostrarObsTP',()=>{
	showId("divLerObs", "flex")
	hideId('divBotoesObs')
})
