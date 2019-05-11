const checkIsMercaMov = movType =>
  movType === "venta" ||
  movType === "compra" ||
  movType === "retorno" ||
  movType === "devolucion" ||
  movType === "presupuesto" ||
  movType === "pedido" ||
  movType === "entrada" ||
  movType === "salida"

const isMoneyIn = movType =>
  movType === "venta" || movType === "retorno" || movType === "deposito"
const isMoneyOut = movType =>
  movType === "extraccion" || movType === "compra" || movType === "devolucion"
const isMercaIn = movType =>
  movType === "compra" || movType === "devolucion" || movType === "entrada"
const isMercaOut = movType =>
  movType === "venta" || movType === "retorno" || movType === "salida"
const isPresupuestoType = movType =>
  movType === "presupuesto" || movType === "pedido"

export {
  checkIsMercaMov,
  isMoneyIn,
  isMoneyOut,
  isMercaOut,
  isMercaIn,
  isPresupuestoType
}
