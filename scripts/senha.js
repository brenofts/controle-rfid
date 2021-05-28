click('btnSenhas', () => {
  hideIds(['busca', 'controle', 'transporte', 'cadastro', 'selecionarTP'])
  showId('senhas', 'flex')
})

function abrirEsqueci() {
  hideId('atualizarSenha')
  showId('esqueciSenha', 'flex')
}
function abrirAtualiza(){
  showId('atualizarSenha','flex')
  hideId('esqueciSenha')
}


click('btnEnviarEqueci', () => {
  if (matriculaEsqueci.value.length > 2) {
    matricula = matriculaEsqueci.value
    db.ref('usuarios').once('value').then((snap) => {
      var resultado = Object.values(snap.val())
      var encontrarUsuario = item => item.matricula == matricula
      var usuarioEncontrado = resultado.find(encontrarUsuario)
      if (usuarioEncontrado != undefined) {
        var confirma = confirm("Deseja realmente enviar nova senha para seu email " + usuarioEncontrado.id +"@metro.df.gov.br?")
        if(confirma == true){
          var newPin = Math.floor((Math.random() + 1) * 5000)
          id = usuarioEncontrado.id
          chave = db.ref().child('usuarios').push().key
          mensagem = 'Utilize o código ' + newPin + ' como senha provisória.'
          email = id + '@metro.df.gov.br'
          fetchUrl = url + '?mensagem=' + mensagem + '&email=' + email + '&chave=' + chave
          fetch(encodeURI(fetchUrl), header)
            .then(response => {
              var newPinBd = newPin * 1993
              db.ref('usuarios/'+ id.replace(".","_") + "/p" ).set(newPinBd).then(resp => {
                alert("Verifique o seu e-mail e atualize sua senha assim que puder!")
                window.open('https://cas.gdfnet.df.gov.br/', 'about:blank')
              }).catch( e => alert('Erro ao modificar o Bd: ' + e))
              console.log(response)
            })
            .catch(e => alert('Erro ao enviar e-mail: ' + e))
          } else{
            alert("Nova senha CANCELADA")
          }
      } else {
        alert('Matrícula não encontrada')
      }
    }).catch(e => alert(e.message))
  }
})

function mostrarOcultar() {
  var comp1 = document.getElementById("pinNovo1")
  var comp = document.getElementById("pinNovo")
  if(comp.type=="password"){
      comp.type="text"
      comp1.type="text"
  } else {
  comp.type="password"
  comp1.type="password"
  }
}

document.getElementById('senhaLogin').addEventListener('focus',()=>{
  if (matriculaLogin.value.length > 2) {
    matricula = matriculaLogin.value
    db.ref('usuarios').once('value').then((snap) => {
      var resultado = Object.values(snap.val())
      var encontrarUsuario = item => item.matricula == matricula
      var usuarioEncontrado = resultado.find(encontrarUsuario)
      if (usuarioEncontrado != undefined){
        id = usuarioEncontrado.id
        document.getElementById('idLogin').innerText = id
      } else {
        alert('Matrícula não encontrada')
        matriculaLogin.focus()
      }
    })
  } else {
    alert('Preencha a matrícula corretamente')
    matriculaLogin.focus()
  }
})

document.getElementById('senhaLogin').addEventListener('input', (e) => {
  var inputValue = e.target.value
  if (inputValue.length == 4) {
    db.ref('usuarios').once('value').then(snap => {
      var resultado = Object.values(snap.val())
      var encontrarUsuario = item => item.matricula == matricula
      var usuarioEncontrado = resultado.find(encontrarUsuario)
      if (inputValue == usuarioEncontrado.p / 1993) {
        showId('divNovaSenha', 'block')
        hideId('login')
        document.getElementById('idNovaSenha').innerText = id
      } else {
        alert('Senha incorreta')
        e.target.value = ''
      }
    }).catch(e => alert(e.message))
  }
})
 
function onlynumber(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  //var regex = /^[0-9.,]+$/;
  var regex = /^[0-9.]+$/;
  if( !regex.test(key) ) {
     theEvent.returnValue = false;
     if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

document.getElementById('pinNovo').addEventListener('input', e => {
  if(e.target.value.length == 4) {
    document.getElementById('pinNovo1').focus()
  }
} )

var pin1

document.getElementById('pinNovo1').addEventListener('input', e => {
  pin1 = document.getElementById('pinNovo').value
  var pin2 = e.target.value
  if (pin2.length == 4) {
    if(pin1 == pin2){
      var conf = confirm('Deseja realmente alterar a senha do usuário: '+ id +'?')
      if(conf == true){
        db.ref('usuarios/'+ id.replace(".","_") + "/p").set(pin2 * 1993).then(() => {
          alert('Senha alterada com sucesso')
          reload()
        }).catch(e => alert(e.message))
      } else {
        alert('Alteração de Senha CANCELADA')
        document.getElementById('pinNovo').value=''
        document.getElementById('pinNovo1').value=''
      }
    } else {
      alert('Senhas não conferem')
      document.getElementById('pinNovo').value=''
      document.getElementById('pinNovo1').value=''
    }
  }
})