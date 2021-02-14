class TP {
    constructor () {

    }
}

class Usuario {
  constructor (tag, matricula, status, tp) {
    this.tag = tag;
    this.matricula = matricula;
    this.status = status;
    this.tp = tp;
    if (this.status == true) {
      console.log("Usuário livre. Autorizar a retirada");
      this.retirar();
    } else {
      if (this.status == false) {
        console.log("Consta TP " + this.tp + " para " + this.matricula + ". Cancelar a retirada.");
        this.cancelar();
      }
    }
  }
  retirar() {
    console.log("Abrindo tela Retirar para o TP " + this.tp)
  }
  cancelar() {
    // ler o status do TP em uso
    console.log("Consta o TP " + this.tp + ' em nome de ' + this.matricula + ' ( mensagem do último registro )')
    // abrir <dialog> com as opções de devolver ou cancelar
  }
}

class Gerente {
  constructor() {}
}
