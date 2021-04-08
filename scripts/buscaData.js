// BUSCA POR DATA

function buscarData(dia) {
	db.ref('historico')
		.once('value')
		.then(snapshot => {
			var resultado = Object.values(snapshot.val())
			function gerarTabela(valores) {
				var ajusteHorario = 10800000
				var data = new Date(dia + ajusteHorario).toLocaleDateString()
				tituloTabela.innerHTML =
					'Busca pela data ' +
					data +
					' | Realizada em ' +
					new Date(new Date().getTime() + diferencaHora).toLocaleString()  + ' | ' + posto
				conteudoBusca[0] = tituloTabela.innerHTML
				for (var i = 0; i < valores.length; i++) {
					// a data deve ser ajustada considerando a diferença de 3h do fuso horário de brasília
					// Daí a necessidade de adicionar 3 horas em milissegundos (10800000) à data selecionada
					// verificar condições em horário de verão
					var dataRegistro = new Date(valores[i].data).toLocaleDateString()
					if (data == dataRegistro) {
						var item = `<tr>
							<td><strong>${valores[i].tp}</strong></td>
                            <td>${valores[i].status}</td>
                            <td>${new Date(valores[i].data).toLocaleDateString()}</td>
                            <td>${new Date(valores[i].data).toLocaleTimeString()}</td>
                            <td>${valores[i].id}</td>
                            <td>${valores[i].gerente}</td>
                            <td>${valores[i].posto}</td>
					  </tr>`
						bodyTabela.innerHTML += item
						resultadoBusca++
						conteudoBusca[i + 1] = valores[i]
					}
				}
				return resultadoZero(resultadoBusca)
			}
			gerarTabela(resultado.reverse())
		})
}

formBuscaData.addEventListener('submit', e => {
	e.preventDefault()
	if (inputDataBuscar.value != '') {
		ajustarHora()
		.then(() => buscarData(inputDataBuscar.valueAsNumber))
		.catch(e => {
			alert(e)
			document.location.reload()
		})
	} else {
		alert('Selecione a data')
	}
})

click('btnBuscaData', () => {
	hideId('buscaMatr')
	showId('buscaData', 'flex')
	inputDataBuscar.focus()
})
