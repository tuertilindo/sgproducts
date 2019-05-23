import {isEmpty} from "../../general/"
export default pagos => {
  let pagado = 0
  let {efectivo, cheque, cuenta, vuelto, tarjeta} = pagos || {}
  if (!isEmpty(efectivo)) {
    if (efectivo.total > 0) {
      pagado += efectivo.total
    } else {
      efectivo = {}
    }
  }
  if (!isEmpty(cheque)) {
    if (cheque.total > 0) {
      pagado += cheque.total
    } else {
      cheque = {}
    }
  }
  if (!isEmpty(cuenta)) {
    if (cuenta.total > 0) {
      pagado += cuenta.total
    } else {
      cuenta = {}
    }
  }
  if (!isEmpty(tarjeta)) {
    const items = tarjeta.items || []
    for (let i = 0; i < items.length; i++) {
      if (items[i].total > 0) {
        pagado += items[i].total
        tarjeta.total += items[i].total
      } else {
        tarjeta = {}
        break
      }
    }
  }
  if (!isEmpty(vuelto)) {
    if (vuelto.total > 0) {
      pagado -= vuelto.total
    } else {
      vuelto = {}
    }
  }
  return {pagado, efectivo, cheque, cuenta, vuelto, tarjeta}
}
