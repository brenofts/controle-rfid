function verificarConexao() {
	db.ref().once('value')
	setTimeout(() => {
		db.ref('.info/connected').on('value', snap => {
			if (snap.val() === false) {
				document.getElementById('fav').href = 'imagens/alert.gif'
				alert('Verificar conexão de Internet')
				reload()
			} else {
				document.getElementById('fav').href = 'imagens/sepura.png'
				console.log('O pai tá on')
				showId('inicio', 'flex')
				hideId('conectando')
				inputTagTP.focus()
			}
		})
	}, 3500)
}

//Fazer a leitura do TP

inputTagTP.addEventListener('input', () => {
	tagTP = inputTagTP.value
	if (tagTP.length == 10) {
		clearInterval(stopFocusTP)
		db.ref('tps')
			.once('value')
			.then(snap => {
				var resultado = Object.values(snap.val())
				function encontrarTP(item) {
					return item.tag == tagTP
				}
				var tpEncontrado = resultado.find(encontrarTP)
				status = tpEncontrado.status.status
				id = tpEncontrado.status.id
				tp = tpEncontrado.status.tp
				matricula = tpEncontrado.status.matricula
				verificarStatus()
			})
			.catch(error => {
				console.log(error.message)
				setTimeout(() => {
					alert('TAG não cadastrada')
					reload()
				}, 100)
			})
	}
})

//Decidir a ação após leitura

function verificarStatus() {
	if (status == 'Em uso') {
		console.log('TP em uso, devolva seu monstro!!!')
		hideId('inicio')
		showId('devolver', 'flex')
		idTPDevolver.innerText = id
		numTPDevolver.innerText = tp
		inputTagGerente.focus()
		focusGerente()
	} else {
		if (status == 'Devolvido') {
			console.log('Tp devolvido')
			hideId('inicio')
			showId('retirar', 'flex')
			numTPRetirar.innerText = tp
			inputTagUsuario.focus()
			focusUsuario()
		} else {
			if (status == 'Transporte') {
				setTimeout(() => {
					alert('TP ' + tp + ' em Transporte')
					console.log('TP em uso, devolva seu monstro!!!')
					hideId('inicio')
					showId('devolver', 'flex')
					idTPDevolver.innerText = id
					numTPDevolver.innerText = tp
					inputTagGerente.focus()
					focusGerente()
				}, 100)
			} else {
				if (status == 'Bloqueado') {
					setTimeout(() => {
						alert('TP ' + tp + ' bloqueado')
						reload()
					}, 100)
				}
			}
		}
	}
}

// pesquisar melhor o método orderBy
// para utilizar na organização cronológica dos resultados de busca
// db.ref('tps').orderByChild('tag').limitToFirst(45).once('value', snap => {
//     console.log(snap.val())
// })

click('btnVoltar', () => reload())

// btnBusca.addEventListener()

// const joao = {
//         'gerente' : false,
//         'id' : 'joao.esteves',
//         'matricula': '05053',
//         'livre': true,
//         'tag' : '12649375',
//         'tp' : '-'
// }

// db.ref('usuarios/joao_esteves').set(joao)

click('btnSelecionarPosto', () => {
	if (selectPosto.value != 'pst') {
		localStorage.setItem('posto', selectPosto.value)
		document.getElementById('nomePosto').innerText = 'OGCOT | ' + localStorage.getItem('posto')
		showId('conectando', 'flex')
		verificarPosto()
	} else {
		alert('Selecione um posto de trabalho válido!')
	}
})

var verificarPosto = () => {
	if (localStorage.getItem('posto') == null) {
		showId('divSelecaoPosto', 'flex')
	} else {
		posto = localStorage.getItem('posto')
		console.log(posto)
		document.getElementById('nomePosto').innerText = 'OGCOT | ' + posto
		hideId('divSelecaoPosto')
		showId('conectando', 'flex')
		verificarConexao()
	}
}

verificarPosto()
var toc = 0
const verificarGerente = action => {
	hideId('principal')
	tpsIncluidos = []
	showId('checarGerente', 'flex')
	// checarGerente.classList.remove('hidden')
	inputChecarGerente.innerHTML += `
    <h4>Apresente credencial de Gerente</h4>
    <input class="input-hidden" type="password" name="" id="verificarTAGGerente">
    `
	var tagGerente = document.getElementById('verificarTAGGerente')
	focusVerificarGerente()
	tagGerente.addEventListener('input', () => {
		if (tagGerente.value.length == 10) {
			db.ref('usuarios')
				.once('value')
				.then(snap => {
					var resultado = Object.values(snap.val())
					function encontrarUsuario(item) {
						return item.tag == tagGerente.value
					}
					var usuarioEncontrado = resultado.find(encontrarUsuario)
					if (usuarioEncontrado != undefined) {
						var ehGerente = usuarioEncontrado.gerente
						if (ehGerente) {
							gerente = usuarioEncontrado.id
							matricula = usuarioEncontrado.matricula
							inputChecarGerente.innerHTML = ''
							hideId('checarGerente')
							showId('principal', 'flex')
							switch (action) {
								case 'transporte':
									hideIds(['controle', 'busca', 'cadastro', 'selecionarTP', 'opcoes', 'senhas'])
									showId('transporte', 'flex')
									idTransporte.innerHTML = gerente
									focusTagTpTransp()
									break
								case 'cadastro':
									console.log('Página de cadastro aberta por', gerente)
									hideIds(['busca', 'controle', 'transporte', 'selecionarTP', 'senhas'])
									showId('cadastro', 'flex')
									break
								default:
									break
							}	
							// setTimeout(()=>{
							// 	reload() 
							// },90050)
							//sessao()
							clearInterval(stopFocusVerificarGerente)
						} else {
							alert('Operação autorizada somente para gerentes')
							reload()
						}
					} else {
						alert('Usuário não cadastrado')
						reload()
					}
				})
		}
	})
}

const sessao = () => {
	qualquercoisa = qualquercoisa + 1
	if (qualquercoisa == 1){
		var tempo = 100
		showId('contador', 'flex')
		contador.children[0].innerHTML = `<strong>${gerente}</strong>`
		contador.children[2].innerText = tempo + 's'
		setInterval(() => {
			tempo = tempo - 1
			contador.children[2].innerText = tempo + 's'
			if (tempo == 0) {
				reload()
			}
		}, 1000);
	} else {console.log("qualquercoisa diferente de 1")}
}

const showAlert = message => {
	hideId('principal')
	showId('alert', 'block')
	document.getElementById('alert').innerHTML = `<p>${message}</p>`
	setTimeout(() => {
		reload()
	}, 10000)
}

const mostrarTPs = () => {
	setTimeout(() => {
		document.querySelector('h3').classList.remove('hidden')
		db.ref('tps').on('value', snap => {
			document.getElementById('tpsEmUso').innerHTML = ''
			var resultado = Object.values(snap.val())
			var count = 0
			resultado.map(tp => {
				var hoje = new Date().getTime()
				var evento = new Date(tp.status.data).getTime()
				var x = hoje - evento
				var z = 1000 * 3600 * 24
				var dias = Math.floor(x / z)
				var cssClass
				var data = new Date(tp.status.data).toLocaleString()
				var title = 'Retirado em ' + data + ' - ' + tp.status.posto
				switch (tp.status.status) {
					case 'Em uso':
						count++
						if (dias <= 1) {
							cssClass = 'item-inicio-green'
						} else if (dias > 1 && dias <= 3) {
							cssClass = 'item-inicio-yellow'
						} else if (dias > 3 ) {
							cssClass = 'item-inicio-red'
						}
						//dias > 2 ? (cssClass = 'item-inicio-red') : (cssClass = 'item-inicio-green')
						var gridItem = `<div title="${title}" class="${cssClass}"><div>${tp.tp}</div><div>${tp.status.id}</div></div>`
						document.getElementById('tpsEmUso').innerHTML += gridItem
						break
				}
			})
			count == 0
				? (document.getElementById('tpsEmUso').innerHTML = `<p>Não constam TPs em uso</p>`)
				: console.log('TPs em uso:', count)
			showId('tpsEmUso', 'grid')
		})
	}, 5000)
}

mostrarTPs()
