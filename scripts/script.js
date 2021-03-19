firebase.auth().signInAnonymously().then(user => {
  console.log(user);
}).catch(error => alert(error.message));
//funções que alteram a exibição (css-display) dos elementos 
function show(x) {
  x.style.display = 'flex'
}

function showInline(x) {
  x.style.display = 'inline'
}

function hide(x) {
  x.style.display = 'none'
}

//definindo os elementos HTML
const principal = document.getElementById('principal')

const pInicio = document.getElementById('inicio')
const pRetirar = document.getElementById('retirar')
const pDevolver = document.getElementById('devolver')
const pTransporte = document.getElementById('transporte')
const pControle = document.getElementById('controle')
const pBusca = document.getElementById('busca')
const pCadastro = document.getElementById('cadastro')
const pOpcoes = document.getElementById('opcoes')
const pTabela = document.getElementById('tabela')

const conectando = document.getElementById('conectando')

const selecaoPosto = document.getElementById('selecaoPosto')
const selectPosto = document.getElementById('selectPosto')
const btnSelecionarPosto = document.getElementById('btnSelecionarPosto')


const inputTagTP = document.getElementById('tagTP')
const inputTagUsuario = document.getElementById('tagUsuario')
const inputTagGerente = document.getElementById('tagGerente')
const inputMatrBuscar = document.getElementById('inputMatrBuscar')
const inputDataBuscar = document.getElementById('inputDataBuscar')

const numTPRetirar = document.getElementById('numTPRetirar')
const numTPDevolver = document.getElementById('numTPDevolver')
const idTPDevolver = document.getElementById('idTPDevolver')

const maisOpc = document.getElementById('maisOpc')
const btnVoltar = document.getElementById('btnVoltar')
const btnControle = document.getElementById('btnControle')
const btnBusca = document.getElementById('btnBusca')
const btnBuscaMatr = document.getElementById('btnBuscaMatr')
const btnBuscaData = document.getElementById('btnBuscaData')
const btnBuscarMatr = document.getElementById('btnBuscarMatr')
const btnBuscarData = document.getElementById('btnBuscarData')

const buscaMatr = document.getElementById('buscaMatr')
const buscaData = document.getElementById('buscaData')


const formBuscaMatr = document.getElementById('formBuscaMatr')
const formBuscaData = document.getElementById('formBuscaData')

const tituloTabela = document.getElementById('tituloTabela')
const bodyTabela = document.getElementById('bodyTabela')
const bodyControle = document.getElementById('bodyControle')
const updateTime = document.getElementById('updateTime')

// variáveis que serão úteis para os registros
var tp
var id
var matricula
var status
var gerente
var posto
var tagTP
var tagUsuario
var tagGerente
var livre
var tpEmUso
var diferencaHora
var chave
var mensagem
var msgAlert
var email
var url = 'https://script.google.com/macros/s/AKfycbzavgwqiNWhjKWLJbkKLi-Cs1rhgpNwjacJrRAQ9bszwQhnrhX-b_7CT-kKmp4MGUSVgA/exec'
var fetchUrl = url + '?mensagem=' +  mensagem + '&email=' + email + '&chave=' + chave
var header = {
  method: 'POST',
  mode: 'no-cors'
}


//anulando o submit
document.getElementById("formulario1").addEventListener("submit", (e) => e.preventDefault())
document.getElementById("formulario2").addEventListener("submit", (e) => e.preventDefault())
document.getElementById("formulario3").addEventListener("submit", (e) => e.preventDefault())


function ajustarHora() {
  if (new Date().getTimezoneOffset() == 180) {
    db.ref('.info/serverTimeOffset').once('value', snap => {
      diferencaHora = snap.val()
    })
  } else {
    alert('Verificar configuração de fuso horário deste computador.')
    document.location.reload()
  }
}

var ajustarHora = () => {
  return new Promise((resolve, reject) => {
    if (new Date().getTimezoneOffset() == 180) {
      db.ref('.info/serverTimeOffset').once('value', snap => {
        diferencaHora = snap.val()
      })
      resolve(diferencaHora)
    } else {
      reject('Verifique as configurações de fuso horário deste computador.')
    }
  })
}

// // Save data to sessionStorage
// sessionStorage.setItem('key', 'value');

// // Get saved data from sessionStorage
// let data = sessionStorage.getItem('key');

// // Remove saved data from sessionStorage
// sessionStorage.removeItem('key');

// // Remove all saved data from sessionStorage
// sessionStorage.clear();


//https://script.google.com/macros/s/AKfycbx_GhIGB1toKuHjMi4p8MLXWIhc6hUY80GbNPpVeG1hcTGgrBp6-M5OFo7ydD_Epjkw/exec
