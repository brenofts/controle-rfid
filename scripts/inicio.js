const principal = document.querySelector('#principal')
const conectando = document.querySelector('#conectando')

function verificarConexao() {
    db.ref().once('value')
    setTimeout(() => {
        db.ref(".info/connected").on("value", (snap) => {
            if (snap.val() === false){
                alert('Verificar conexão de Internet');
            } else {
                console.log('Conectado')
                show(principal)
                hide(conectando)
            }
        })
    }, 2000);
}

verificarConexao()

function show(element) {
    element.style.display = 'flex'
}

function hide(element) {
    element.style.display = 'none'
}