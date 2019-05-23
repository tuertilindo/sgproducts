import extractMovs from "./extractMovs"
import {extractStock} from "../../mov/util"
export default caja => {
  const movs = extractMovs(caja)
  let stock = {}
  for (let i = 0; i < movs.length; i++) {
    const obj = extractStock(movs[i])
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        stock[key] = (stock[key] || 0) + obj[key]
      }
    }
    stock = {...stock}
  }
  return stock
}
