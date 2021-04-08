firebase.auth().signInAnonymously().then(user => console.log(user)).catch(error => alert(error.message))

//funções que alteram a exibição (css-display) dos elementos

const showId = (id, displayType) => (document.getElementById(id).style.display = displayType)
const hideId = id => (document.getElementById(id).style.display = 'none')
const click = (id, action) => document.getElementById(id).addEventListener('click', action)

// função que cria as variáveis iguais aos nomes das ids html. inserir a id na array ids.
const ids = [
	'selectPosto',
	'numTPRetirar',
	'numTPDevolver',
	'idTPDevolver',
	'formBuscaMatr',
	'formBuscaData',
	'tituloTabela',
	'bodyTabela',
	'bodyControle',
	'updateTime',
	'tpOuEmpregado',
	'inputTagGerente',
	'inputTagTP',
	'inputTagUsuario',
	'inputMatrBuscar',
	'inputDataBuscar',
  'formRFIDTP',
  'formRFIDRetirar',
  'formRFIDDevolver',
  "formNovoEmpregado"
]

const createVariables = () => {
	for (let i = 0; i < ids.length; i++) {
		const element = id[i]
		var id = element.getAttribute('id')
		var createVar = 'window.' + id + '= document.getElementById("' + id + '")'
		eval(createVar)
	}
}

// variáveis que serão úteis para os registros
var tp, id, matricula, status, gerente, posto, email
var tagTP, tagUsuario, tagGerente
var livre, tpEmUso
var diferencaHora
var chave, mensagem, msgAlert
var url =	'https://script.google.com/macros/s/AKfycbzavgwqiNWhjKWLJbkKLi-Cs1rhgpNwjacJrRAQ9bszwQhnrhX-b_7CT-kKmp4MGUSVgA/exec'
var fetchUrl = url + '?mensagem=' + mensagem + '&email=' + email + '&chave=' + chave
var header = {
	method: 'POST',
	mode: 'no-cors',
}

//anulando o submit
formRFIDTP.addEventListener('submit', e => e.preventDefault())
formRFIDRetirar.addEventListener('submit', e => e.preventDefault())
formRFIDDevolver.addEventListener('submit', e => e.preventDefault())
formNovoEmpregado.addEventListener('submit', e => e.preventDefault())



// verificando fuso horário e corrigindo diferenças de horário em relação ao servidor do Firebase

const ajustarHora = () => {
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
