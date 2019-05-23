export default caja => {
  let movs = []
  const obj = caja.movs || {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      movs = [...movs, ...obj[key]]
    }
  }
  return movs
}
