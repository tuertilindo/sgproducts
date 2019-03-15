import { isEmpty } from "../../general/"
export default pagos => {
  let pagado = 0
  let { efectivo, cheque, cuenta, vuelto, tarjeta } = pagos || {}
  if (!isEmpty(efectivo)) {
    if (efectivo.total > 0) {
      pagado += efectivo.total
    } else {
      efectivo = {}
    }
  }
  return { pagado, efectivo, cheque, cuenta, vuelto, tarjeta }
}
