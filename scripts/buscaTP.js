// BUSCA POR TP

function buscarTP(tp) {
  db
      .ref("historico")
      .once("value")
      .then((snapshot) => {
          var data = Object.values(snapshot.val())
          function gerarTabela(valores) {
              for (var i = 0; i < valores.length; i++) {
                  var tpReg = valores[i].tp
                  if (tp == tpReg) {
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