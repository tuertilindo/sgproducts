import {isMoneyOnly} from "../checkerMov"

import calculatePagos from "../calculatePagos"
import {getConfig} from "../../../general/"

export default mov => {
  const {pagos, type, total} = mov
  let payErrors = []
  let mpagos = calculatePagos(pagos)
  if (type === "venta" && getConfig().autoPagar) {
    mpagos = {
      efectivo: {total},
      pagado: total
    }
  }
  const pagado = mpagos.pagado
  if (isMoneyOnly(type) && pagado <= 0) {
    payErrors.push({
      index: payErrors.length,
      type: "warning",
      message: "Faltan realizar pagos"
    })
  } else if (total > pagado) {
    payErrors.push({
      index: payErrors.length,
      type: "warning",
      message: "Faltan realizar pagos"
    })
  } else if (total < pagado) {
    payErrors.push({
      index: payErrors.length,
      type: "warning",
      message: "Falta dar vueltos"
    })
  }
  return {
    pagos: mpagos,
    payErrors,
    pagado
  }
}
