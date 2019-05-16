import {extractStock, extractPagos} from "../mov/util"
import {sumObj} from "../general/util"
const ObjectID = require("bson-objectid")

const createCaja = user => {
  if (!user) throw Error("No puede crear una caja sin un usuario")
  const code = ObjectID.generate()
  return {
    createdAt: new Date(),
    createdBy: user,
    title: "caja: " + code,
    status: "open",
    code: code
  }
}
const extractMovs = caja => {
  let movs = []
  const obj = caja.movs || {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      movs = [...movs, ...obj[key]]
    }
  }
  return movs
}
const calculateStock = caja => {
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
const transformCaja = caja => {
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

const search = data => true

export {createCaja, extractMovs, calculateStock, search, transformCaja}
