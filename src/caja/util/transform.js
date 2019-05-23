import {extractStock, extractPagos} from "../../mov/util"
import {sumObj} from "../../general/util"
import extractMovs from "./extractMovs"
export default caja => {
  const movs = extractMovs(caja)
  let stock = caja.initialStock || {}
  let pagos = {}
  for (let i = 0; i < movs.length; i++) {
    pagos = sumObj(pagos, extractPagos(movs[i]))
    stock = sumObj(stock, extractStock(movs[i]))
  }
  const ret = {...caja, stock, pagos}
  return ret
}
