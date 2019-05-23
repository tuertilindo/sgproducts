import {isEmpty} from "../../general/"
export default pagos => {
  const {efectivo, vuelto, tarjeta, cuenta, cheque, pagado} = pagos
  let list = []
  if (!isEmpty(efectivo))
    list.push({
      name: "Pago en efectivo",
      type: "efectivo",
      price: efectivo.total
    })
  if (!isEmpty(vuelto))
    list.push({
      name: "Vuelto",
      type: "vuelto",
      price: vuelto.total
    })
  if (!isEmpty(tarjeta)) {
    const items = tarjeta.items || []
    for (let i = 0; i < items.length; i++) {
      list.push({
        name: items[i].description,
        type: "tarjeta",
        price: tarjeta.total
      })
    }
  }

  if (!isEmpty(cuenta))
    list.push({
      name: "Pago con Cuenta",
      type: "cuenta",
      price: cuenta.total
    })
  if (!isEmpty(cheque))
    list.push({
      name: "Pago con cheque",
      type: "cheque",
      price: cheque.total
    })
  return list
}
