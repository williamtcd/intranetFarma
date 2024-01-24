// criar referência ao formulário e aos campos de resposta
const frm = document.querySelector('.frm')
const respCustoLevarQuantidade = document.querySelector('#inValorLevarQuantidade')
const respCustoPagarQuantidade = document.querySelector('#inValorPagarQuantidade')
const respPercMargemUnid = document.querySelector('#inMargemUnid')
const respPercMarkupUnid = document.querySelector('#inMarkupUnid')
const respValorLucroUnid = document.querySelector('#inLucroUnid')
const respPercMargemLvMais = document.querySelector('#inMargemLvMais')
const respPercMarkupLvMais = document.querySelector('#inMarkupLvMais')
const respPercValorLucroLvMais = document.querySelector('#inLucroLvMais')
const respValorSimOuNao = document.querySelector('#inSimOuNao')
const respValorPercentual = document.querySelector('#inPercentual')

// cria o ouvinte de evento, acionado quando o botão submit for clicado
frm.addEventListener('submit', (e) => {
  e.preventDefault() // evita envio do formulário

  //custo
  const custo = Number(document.getElementById('inCusto').value)
  const levarQuantidade = Number(document.getElementById('inLevarQuantidade').value)

  const custoLevarQuantidade = custo * levarQuantidade // calcula o custo
  respCustoLevarQuantidade.value = `R$ ` + custoLevarQuantidade.toFixed(2) // exibe resposta

  //venda
  const venda = Number(document.getElementById('inVenda').value)
  const pagarQuantidade = Number(document.getElementById('inPagarQuantidade').value)

  const vendaPagarQuantidade = venda * pagarQuantidade // calcula o custo
  respCustoPagarQuantidade.value = `R$ ` + vendaPagarQuantidade.toFixed(2) // exibe resposta

  // margem unidade
  const margemUnidade = 1 - custo / venda
  const margemUnidadePerc = margemUnidade * 100
  respPercMargemUnid.value = Math.round(margemUnidadePerc) + `%`

  // markup unidade
  const markupUnidade = venda / custo - 1
  const markupUnidadePerc = markupUnidade * 100
  respPercMarkupUnid.value = Math.round(markupUnidadePerc) + `%`

  //lucrounidade
  const imposto = Number(document.getElementById('inImposto').value)
  const impostoPerc = (imposto / 100).toFixed(2)
  const lucroUnidade = venda - custo - venda * impostoPerc
  respValorLucroUnid.value = `R$ ` + lucroUnidade.toFixed(2)

  //margem leve mais por menos
  const margemLeveMais = 1 - (custo * levarQuantidade) / (venda * pagarQuantidade)
  const margemLeveMaisPerc = margemLeveMais * 100
  respPercMargemLvMais.value = Math.round(margemLeveMaisPerc) + `%`

  //markup leve mais por menos
  const markupLeveMais = Number((venda * 2) / (custo * levarQuantidade)) - 1
  const markupLevemaisPerc = markupLeveMais * 100
  respPercMarkupLvMais.value = Math.round(markupLevemaisPerc) + `%`

  // lucro leve mais por menos

  const lucroLeveMais = Number(
    venda * pagarQuantidade - custo * levarQuantidade - vendaPagarQuantidade * impostoPerc
  )
  respPercValorLucroLvMais.value = `R$ ` + lucroLeveMais.toFixed(2)

  //resposta condicional campo decisão valor
  const decisaoPerc = (lucroLeveMais / lucroUnidade - 1) * 100

  if (lucroUnidade < 0) {
    respValorPercentual.value = 'Lucro Negativo'
  } else {
    respValorPercentual.value = Math.round(decisaoPerc) + `%`
  }

  //resposta condicional sim e nao
  const calcMargemPg2Lv3 = Number(document.getElementById('inMargemp2l3').value)
  const margemPg2Lv3 = (calcMargemPg2Lv3 * 100).toFixed(2)

  if (respValorPercentual.value === 'Lucro Negativo' || respValorPercentual.value < margemPg2Lv3) {
    respValorSimOuNao.value = 'Não'
  } else {
    respValorSimOuNao.value = 'Sim'
  }
})
