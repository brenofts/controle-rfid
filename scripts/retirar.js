
inputTagUsuario.addEventListener("input", () => {
    tagUsuario = inputTagUsuario.value
    if (tagUsuario.length == 8) {      
      db.ref("usuarios")
      .once("value")
      .then((snap) => {
          var resultado = Object.values(snap.val())
          function encontrarUsuario(item) {
              return item.tag == tagUsuario
          }
          var usuarioEncontrado = resultado.find(encontrarUsuario)
          id = usuarioEncontrado.id
          matricula = usuarioEncontrado.matricula
          livre = usuarioEncontrado.livre
          tpEmUso = usuarioEncontrado.tp
          if (livre == true){
            ajustarHora()
            retirar(id, matricula, tp, posto)
          } else {
            if (livre == false) {
              alert('Consta TP ' + tpEmUso + ' em nome de ' + id)
              document.location.reload()
            }
          }
      }).catch(error => {
        if (error.message.includes('contains NaN')) {
          alert('Não foi possível realizar o registro de retirada.')
          document.location.reload()
        } else {
          if (error.message.includes('Cannot read property')){
            alert('TAG não cadastrada')
            document.location.reload()
          } else {
            alert('Algo deu errado: ' + error.message)
            document.location.reload()
          }
        }
        console.log(error.message)
      })
    }
})

// function verificarFusoRetirar() {
//   if (new Date().getTimezoneOffset() == 180) {
//     retirar(id, matricula, tp, posto)
//   } else {
//     alert('Verificar configuração de fuso horário deste computador.')
//     document.location.reload()
//   }
// }


function retirar(i, m, t, p) {
    // o valor que será atualizado
    var registro = {
        status: "Em uso",
        id: i,
        matricula: m,
        tp: t,
        posto: p,
        gerente: "-",
        data: new Date().getTime() + diferencaHora
    }

    // cria uma variável do tipo objeto
    var updates = {}
    // cria um item nesse objeto updates[item] = "valor do item"
    // seria updates = {
    //  /tps/tp/status : registro,
    //  /historico/contador : registro,
    //  /usuarios/id/livre : false
    //  /usuarios/id/tp : tp
    // }
    updates["/tps/" + t + "/status/"] = registro
    // bloqueia ou libera o usuario

    updates["/usuarios/" + i.replace(".", "_") + "/livre/"] = false
    updates["/usuarios/" + i.replace(".", "_") + "/tp/"] = t
    var mensagem = t + " retirado por " + i + " com sucesso"

    // retorna chamando o firebase para escrever as atualizacoes
    return db
        .ref()
        .update(updates)
        .then(db.ref("historico").push().set(registro))
        .then(() => {
            alert(mensagem)
            document.location.reload()
        })
        .catch((e) => {
            return alert(e.message)
        })
}

// https://script.google.com/macros/s/AKfycbx2oKGVIkePVCDC3xO4ieOxRWUBpoIRCJfqQ2SX/exec

// data=
// &hora=
// &posto=
// &tp=
// &piloto=
// &gerente=
// &status=
// &email=
// &message=
