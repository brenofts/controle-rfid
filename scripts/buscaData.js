// BUSCA POR DATA

function buscarData(dia) {
    db
        .ref("historico")
        .once("value")
        .then((snapshot) => {
            var data = Object.values(snapshot.val())
            function gerarTabela(valores) {
                for (var i = 0; i < valores.length; i++) {
                    // a data deve ser ajustada considerando a diferença de 3h do fuso horário de brasília
                    // Daí a necessidade de adicionar 3 horas em milissegundos (10800000) à data selecionada
                    // verificar condições em horário de verão
                    var ajusteHorario = 10800000
                    var data = new Date(dia + ajusteHorario).toLocaleDateString()
                    var dataRegistro = new Date(valores[i].data).toLocaleDateString()
                    if (data == dataRegistro) {
                        console.log(valores[i])
                        resultadoBusca++
                    }
                    console.log(resultadoBusca)
                }
                return resultadoZero(resultadoBusca)
            }
            gerarTabela(data)
        })
}

btnBuscaData.addEventListener('click', () => {
    hide(buscaMatr)
    show(buscaData)
})

formBuscaData.addEventListener('submit', (e) => {
    e.preventDefault()
    if (inputDataBuscar.value != "") {
        buscarData(inputDataBuscar.valueAsNumber)
      } else {
        alert("Selecione a data")
      }
})