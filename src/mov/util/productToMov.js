export default product => {
  const {code, name = "desconocido", price = {}, metrica = "u", combo} = product
  const {total = 0, iva = 21} = price || {}
  return {
    count: 1,
    name,
    code,
    metrica,
    iva: iva,
    price: total,
    total,
    combo
  }
}
