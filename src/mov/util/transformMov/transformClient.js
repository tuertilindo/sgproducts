import getDestTypePerMov from "../getDestTypePerMov"
import {isEmpty} from "../../../general"
import {getConfig} from "../../../general/"
export default mov => {
  const destType = getDestTypePerMov(mov.type)
  const {type} = mov
  let target = mov.target || {}
  let clientErrors = []
  let factura = "C"
  if (destType === "desconocido") {
    clientErrors.push({
      index: clientErrors.length,
      type: "error",
      message: "No se reconoce el tipo de movimiento"
    })
  } else {
    if (
      isEmpty(target) ||
      isEmpty(target.name) ||
      isEmpty(target.code) ||
      isEmpty(target.type) ||
      target.type !== destType
    ) {
      if (type === "venta") {
        const {ventaTarget, lastClient} = getConfig()

        if (ventaTarget === "consumidor") {
          target = {
            name: "Consumidor Final",
            code: "0000",
            iva: "monotributo",
            type: "cliente"
          }
        } else if (ventaTarget === "ultimo") {
          target = lastClient
        }
      }
      if (isEmpty(target))
        clientErrors.push({
          index: clientErrors.length,
          type: "warning",
          message: "Debe asignar un " + destType + " a este movimiento"
        })
    }
  }
  //factura
  if (type === "pedido" || type === "presupuesto") {
    factura = "P"
  } else if (type === "deposito" || type === "extraccion") {
    factura = "R"
  } else if (type === "deposito" || type === "extraccion") {
    factura = "R"
  } else if (type === "entrada" || type === "salida") {
    factura = "X"
  }
  return {
    clientErrors,
    target,
    factura
  }
}
