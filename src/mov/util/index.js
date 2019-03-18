import {searchText} from "../../general/"
import checkIsMercaMov from "./checkIsMercaMov"
import transformMov from "./transformMov"
import getDestTypePerMov from "./getDestTypePerMov"
import MovStyles from "./movStyles"
const ObjectID = require("bson-objectid")
var moment = require("moment")

const getStyleByMovType = (type, options) => {
  return (
    MovStyles[type] || {
      background: "#8BBBF7",
      color: "#465D7B",
      icon: "read"
    }
  )
}
const getStyleByPay = (type, options) => {
  let c = "#556aFF"
  let b = "#ddddfd"
  let i = "edit"
  const {onlyColor, onlyBack} = options || {}
  switch (type) {
    case "efectivo":
      b = "#75FF70"
      c = "#5E3232"
      i = "money-collect"
      break
    case "vuelto":
      b = "#FB8686"
      c = "#5F3F3A"
      i = "red-envelope"
      break
    case "cheque":
      b = "#88C9DD"
      c = "#2A6046"
      i = "book"
      break

    case "tarjeta":
      b = "#F9EB85"
      c = "#5D5832"
      i = "credit-card"
      break
    case "cuenta":
      b = "#DA8BD3"
      c = "#52335F"
      i = "roperty-safety"
      break

    default:
      b = "#8BBBF7"
      c = "#465D7B"
      i = "edit"
      break
  }

  return {
    style: {
      color: onlyBack ? null : c,
      backgroundColor: onlyColor ? null : b
    },
    icon: i
  }
}

const getStyleByDesc = (type, options) => {
  let c = "#556aFF"
  let b = "#ddddfd"
  let i = "edit"
  const {onlyColor, onlyBack, value} = options || {}
  const mtype = type + (value < 0 ? "d" : "u")
  switch (mtype) {
    case "customu":
      b = "#75FF70"
      c = "#5E3232"
      i = "rise"
      break
    case "customd":
      b = "#FB8686"
      c = "#5F3F3A"
      i = "fall"
      break
    case "ivau":
      b = "#88C9DD"
      c = "#2A6046"
      i = "safety-certificate"
      break

    case "combou":
      b = "#F9EB85"
      c = "#5D5832"
      i = "rise"
      break
    case "combod":
      b = "#DA8BD3"
      c = "#52335F"
      i = "fall"
      break

    default:
      b = "#8BBBF7"
      c = "#465D7B"
      i = "rise"
      break
  }

  return {
    style: {
      color: onlyBack ? null : c,
      backgroundColor: onlyColor ? null : b
    },
    icon: i
  }
}

const search = (l, f) => {
  const {text, type} = f

  return l.filter(i => {
    return (
      (!text ||
        text.length === 0 ||
        searchText(i.name || i.target.name, text)) &&
      (!type || type === "all" || type === i.type)
    )
  })
}

const createNewMov = (type, user) => {
  return {
    items: [],

    code: ObjectID.generate(),
    type: type,
    user: user,
    date: moment().format(),
    factura: "C"
  }
}

export {
  transformMov,
  getStyleByMovType,
  search,
  createNewMov,
  getDestTypePerMov,
  checkIsMercaMov,
  getStyleByDesc,
  getStyleByPay,
  MovStyles
}
