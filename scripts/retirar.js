
inputTagUsuario.addEventListener("input", (e) => {
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
            retirar(id, matricula, tp, posto)
          } else {
            if (livre == false) {
              alert('Consta TP ' + tpEmUso + ' em nome de ' + id)
              document.location.reload()
            }
          }
      }).catch(error => {
        alert('TAG não cadastrada')
        console.log(error.message)
        document.location.reload()
      })
    }
})



var diferencaHora

function retirar(i, m, t, p) {
    db.ref('.info/serverTimeOffset').on('value', snap => {
      diferencaHora = snap.val()
    })
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
