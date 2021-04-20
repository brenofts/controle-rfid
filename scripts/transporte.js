click('btnTransporte', () => {
  verificarGerente()
  hideIds(['controle', 'busca', 'cadastro'])
  showId('transporte', 'flex')
})