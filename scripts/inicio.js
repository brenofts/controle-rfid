function verificarConexao() {
    db.ref().once("value")
    setTimeout(() => {
        db.ref(".info/connected").on("value", (snap) => {
            if (snap.val() === false) {
                alert("Verificar conexão de Internet")
                document.location.reload()
            } else {
                console.log("O pai tá on")
                show(pInicio)
                hide(conectando)
                inputTagTP.focus()
            }
        })
    }, 2500)
}

//Fazer a leitura do TP
inputTagTP.addEventListener("input", () => {
        tagTP = inputTagTP.value
    if (tagTP.length == 8) {
        db.ref("tps")
            .once("value")
            .then(snap => {
                var resultado = Object.values(snap.val())
                function encontrarTP(item) {
                    return item.tag == tagTP
                }
                var tpEncontrado = resultado.find(encontrarTP)
                status = tpEncontrado.status.status
                id = tpEncontrado.status.id
                tp = tpEncontrado.status.tp
                matricula = tpEncontrado.status.matricula
                verificarStatus()
            }).catch(error => {
                console.log(error.message)
                alert('TAG não cadastrada')
                document.location.reload()
            })
    }
})


//Decidir a ação após leitura

function verificarStatus() {
    if (status == 'Em uso') {
        console.log('TP em uso, devolva seu monstro!!!')
        hide(pInicio)
        show(pDevolver)
        idTPDevolver.innerText = id
        numTPDevolver.innerText = tp
        inputTagGerente.focus()
    } else {
        if(status == 'Devolvido') {
            console.log('Tp devolvido')
            hide(pInicio)
            show(pRetirar)
            numTPRetirar.innerText = tp
            inputTagUsuario.focus()
        }
    }
}

// pesquisar melhor o método orderBy
// para utilizar na organização cronológica dos resultados de busca
// db.ref('tps').orderByChild('tag').limitToFirst(45).once('value', snap => {
//     console.log(snap.val())
// })

btnVoltar.addEventListener('click', () => {
    document.location.reload()
})

btnBusca.addEventListener('click', () => {
    show(pBusca)
    hide(pControle)
})


// const joao = {
//         'gerente' : false,
//         'id' : 'joao.esteves',
//         'matricula': '05053',
//         'livre': true,
//         'tag' : '12649375',
//         'tp' : '-'
// }

// db.ref('usuarios/joao_esteves').set(joao)

btnSelecionarPosto.addEventListener('click', () => {
    localStorage.setItem('posto', selectPosto.value)
    document.getElementById('nomePosto').innerText = 'OGCOT | ' + localStorage.getItem('posto')
    show(conectando)
    verificarPosto()
})


var verificarPosto = () => {
    if (localStorage.getItem('posto') == null) {
        show(selecaoPosto)
    } else {
        posto = localStorage.getItem('posto')
        console.log(posto)
        document.getElementById('nomePosto').innerText = 'OGCOT | ' + posto
        hide(selecaoPosto)
        show(conectando)
        verificarConexao()
    }
}

verificarPosto()
