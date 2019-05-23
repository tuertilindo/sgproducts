const checkIsMercaMov = movType =>
  movType === "venta" ||
  movType === "compra" ||
  movType === "retorno" ||
  movType === "devolucion" ||
  movType === "presupuesto" ||
  movType === "pedido" ||
  movType === "entrada" ||
  movType === "salida"

const canPayTarjeta = movType => movType === "deposito" || movType === "venta"

const isMoneyOnly = movType =>
  movType === "deposito" || movType === "extraccion"
const isMoneyIn = movType =>
  movType === "venta" || movType === "retorno" || movType === "deposito"
const isMoneyOut = movType =>
  movType === "extraccion" || movType === "compra" || movType === "devolucion"
const isMoneyEnvolve = movType =>
  isMoneyIn(movType) || isMoneyOut(movType) || isMoneyOnly(movType)
const isMercaIn = movType =>
  movType === "compra" || movType === "devolucion" || movType === "entrada"
const isMercaOut = movType =>
  movType === "venta" || movType === "retorno" || movType === "salida"
const isPresupuestoType = movType =>
  movType === "presupuesto" || movType === "pedido"

const canPayEfectivo = mov =>
  isMoneyOnly(mov.type) || (isMoneyEnvolve(mov.type) && mov.pagado < mov.total)
const extractVueltoToPay = mov =>
  isMoneyEnvolve(mov.type) && mov.pagado > mov.total
    ? mov.pagado - mov.total
    : 0

const payStatus = mov => {
  const {total = 0, pagado = 0} = mov
  let efectivo = total - pagado
  let vuelto = pagado - total
  if (isMoneyOnly(mov.type)) {
  } else if (isMoneyIn(mov.type)) {
    efectivo = total - pagado
  }
  return {
    canPayEfectivo: isMoneyOnly(mov.type) || efectivo > 0,
    canPayVuelto: !isMoneyOut(mov.type) && vuelto > 0,
    canPayTarjeta: canPayTarjeta(mov.type),
    efectivo,
    vuelto
  }
}

export {
  checkIsMercaMov,
  isMoneyOnly,
  isMoneyIn,
  isMoneyEnvolve,
  isMoneyOut,
  isMercaOut,
  isMercaIn,
  isPresupuestoType,
  canPayEfectivo,
  extractVueltoToPay,
  payStatus
}
