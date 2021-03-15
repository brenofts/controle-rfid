firebase.auth().signInAnonymously().then(user => {
  console.log('o pai tá on', user);
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
var posto = 'T-PAS'
var tagTP
var tagUsuario
var tagGerente
var livre
var tpEmUso
var diferencaHora


//anulando o submit
document.getElementById("formulario1").addEventListener("submit", (e) => e.preventDefault())
document.getElementById("formulario2").addEventListener("submit", (e) => e.preventDefault())
document.getElementById("formulario3").addEventListener("submit", (e) => e.preventDefault())


function ajustarHora() {
  // ao chamar a função ajustarHora() será retornado o valor da diferença caso o fuso esteja correto
  if (new Date().getTimezoneOffset() == 180) {
    db.ref('.info/serverTimeOffset').once('value', snap => {
      diferencaHora = snap.val()
      return diferencaHora
    })
  } else {

  }

}