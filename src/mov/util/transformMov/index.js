import transfromPagos from "./transformPagos"
import transformItems from "./transformItems"
import transformClient from "./transformClient"
import transUser from "./transformUser"

export default mov => {
  let {status, type, tags = [], date, code} = mov

  let descontado = 0
  let errors = []
  const {
    total,
    subtotal,
    ivaTotal,
    impuestos,
    items,
    descuentos,
    itemsErrors
  } = transformItems(mov)
  //target
  const {target, clientErrors, factura} = transformClient(mov)
  //pagos
  const {pagos, payErrors, pagado} = transfromPagos({
    pagos: mov.pagos,
    type,
    total
  })
  const {user, createdBy, userErrors} = transUser(mov)

  errors = [...itemsErrors, ...clientErrors, ...payErrors, ...userErrors]

  //usuario

  let ret = {
    items,
    name: target ? target.name || "desconocido" : "no hay destinatario",
    subtotal,
    errors,
    target,
    total,
    descontado,
    descuentos,
    impuestos,
    ivaTotal,
    pagos,
    pagado,
    status,
    type,
    tags,
    date,
    code,
    factura,
    user,
    createdBy
  }
  return ret
}
