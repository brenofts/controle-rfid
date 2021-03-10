// Fazer a leitura da TAG de gerente para devolução

inputTagGerente.addEventListener('input', () => {
  tagGerente = inputTagGerente.value
  if (tagGerente.length == 8) {
    db.ref("usuarios")
            .once("value")
            .then((snap) => {
                var resultado = Object.values(snap.val())
                function encontrarUsuario(item) {
                    return item.tag == tagGerente
                }
                var usuarioEncontrado = resultado.find(encontrarUsuario)
                gerente = usuarioEncontrado.id
                var ehGerente = usuarioEncontrado.gerente
                if (ehGerente == true){
                  devolver(id, matricula, tp, posto, gerente)
                } else {
                  if (ehGerente == false) {
                    alert('Operação autorizada somente para gerentes')
                    document.location.reload()
                  }
                }
            }).catch(error => {
              alert('TAG não cadastrada')
              console.log(error.message)
            })
  }
})

function devolver(i, m, t, p, g) {
    var registro = {
      status: 'Devolvido',
      id: i,
      matricula: m,
      tp: t,
      posto: p,
      gerente: g,
      data: new Date().getTime()
    };
  
    // cria uma variável vazia do tipo objeto
    var updates = {};
    // cria um item nesse objeto updates[item] = "valor do item"
    // seria updates = {
    //  /tps/tp/status : registro,
    //  /historico/contador : registro,
    //  /usuarios/id/livre : true
    // }
    updates["/tps/" + t + "/status/"] = registro;
    // bloqueia ou libera o usuario
    
    updates["/usuarios/" + i.replace(".", "_") + "/livre/"] = true;
    updates["/usuarios/" + i.replace(".", "_") + "/tp/"] = "-";
    var mensagem = t + " devolvido por " + i + " para " + g + " com sucesso";
    
    // retorna chamando o firebase para escrever as atualizacoes
    return firebase
      .database()
      .ref()
      .update(updates)
      .then(db.ref("historico").push().set(registro))
      .then(() => {
        alert(mensagem);
        document.location.reload();
      })
      .catch(e => alert(e.message));
  }