inputTagUsuario.addEventListener("input", () => {
    tagUsuario = inputTagUsuario.value
    if (tagUsuario.length == 10) {
      clearInterval(stopFocusUsuario)      
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
            .then(() => retirar(id, matricula, tp, posto))
            .catch(e => {
              alert(e)
              reload()
            })
          } else {
            if (livre == false) {
              alert('Consta TP ' + tpEmUso + ' em nome de ' + id)
              reload()
            }
          }
      }).catch(error => {
        if (error.message.includes('contains NaN')) {
          alert('Não foi possível realizar o registro de retirada.')
          reload()
        } else {
          if (error.message.includes('Cannot read property')){
            alert('TAG não cadastrada \n' + error.message)
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

    chave = db.ref().child('historico').push().key
    // cria uma variável do tipo objeto
    var updates = {}
    // cria um item nesse objeto updates[item] = "valor do item"
    // seria updates = {
    //  /tps/tp/status : registro,
    //  /historico/chave : registro,
    //  /usuarios/id/livre : false
    //  /usuarios/id/tp : tp
    // }
    updates["/tps/" + t + "/status/"] = registro
    updates["/historico/" + chave] = registro
    // bloqueia ou libera o usuario

    updates["/usuarios/" + i.replace(".", "_") + "/livre/"] = false
    updates["/usuarios/" + i.replace(".", "_") + "/tp/"] = t
    msgAlert = `
      <p> ${t} retirado por ${i} em ${p} </p><p> ${new Date(registro.data).toLocaleString()} </p><p>Registro ${chave}</p>
    `
	  mensagem = t + ' retirado por ' + i + ' em ' + p + '<br>' + new Date(registro.data).toLocaleString() 
    email = i + '@metro.df.gov.br'
    fetchUrl = url + '?mensagem=' +  mensagem + '&email=' + email + '&chave=' + chave

    // retorna chamando o firebase para escrever as atualizacoes
    return db
        .ref()
        .update(updates)
        .then(fetch(encodeURI(fetchUrl), header).then((response) => {
          console.log(response)
        }).catch(e => alert('Erro ao enviar e-mail: ' + e)))
        .then(() => {
            showAlert(msgAlert)
        })
        .catch((e) => {
            return alert(e.message)
        })
}


// https://script.google.com/macros/s/AKfycbx2oKGVIkePVCDC3xO4ieOxRWUBpoIRCJfqQ2SX/exec?

// data=
// &hora=
// &posto=
// &tp=
// &piloto=
// &gerente=
// &status=
// &email=
// &message=

