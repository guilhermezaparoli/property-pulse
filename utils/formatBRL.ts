

const formatBRL = (data : number) => {
    let BrazilianReal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
  return BrazilianReal.format(data)
}

export default formatBRL
