// BUSCA POR POSTO

function buscarPosto(posto) {
  database
      .ref("historico")
      .once("value")
      .then((snapshot) => {
          var data = Object.values(snapshot.val())
          function gerarTabela(valores) {
              for (var i = 0; i < valores.length; i++) {
                  var postoReg = valores[i].posto
                  if (posto == postoReg) {
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