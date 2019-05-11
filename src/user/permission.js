export default user => {
  const {type = "cliente"} = user || {}
  const lvls = {
    cliente: 0,
    vendedor: 1,
    encargado: 2,
    contador: 3,
    admin: 4
  }
  const mylvl = lvls[type]
  return {
    isAdmin: type === "admin",
    canSell: mylvl > 0,
    canBuy: mylvl > 2,
    canBack: mylvl > 1,
    canAdd: mylvl > 2,
    canOpenCaja: mylvl > 1
  }
}
