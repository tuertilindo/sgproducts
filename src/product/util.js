import {searchText} from "../general/"
const validate = require("validate.js")

const validateProduct = product => {
  const constraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: "El producto no tiene nombre"
      },
      length: {
        minimum: 3,
        maximum: 40,
        tooLong: "En nómbre es demasiado largo",
        tooShort: "El nómbre es demasiado corto"
      }
    },
    description: {
      length: {
        maximum: 128,
        tooLong: "La descripción es demasiado larga"
      }
    },
    code: {
      presence: {
        allowEmpty: false,
        message: "El código es obligatorio"
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "El código solo puede tener letras y números (a-z, 0-9)"
      },
      length: {
        maximum: 25,
        tooLong: "El código es muy largo, hasta 25 caracteres"
      }
    },
    "price.total": {
      presence: {
        allowEmpty: false,
        message: "El producto no tiene precio"
      },
      numericality: {
        greaterThan: 0,
        message: "El producto no tiene precio"
      }
    }
  }

  const rest = validate(product, constraints, {fullMessages: false})
  if (product.type === "combo") {
    return {
      ...rest,
      ...validate(product, {
        "combo.subitems": {
          presence: {
            allowEmpty: false,
            message: "El combo no tiene productos"
          },
          length: {
            minimum: 2,
            maximum: 10,
            tooLong: "En combo es demasiado largo",
            tooShort: "Al menos debe tener dos productos en el combo"
          }
        }
      })
    }
  }

  return rest
}

const search = (l, f) => {
  const {text, type, tags = [], limit = 10, stock} = f
  let ret = []
  let count = 0
  for (let i = 0; i < l.length; i++) {
    if (
      (!text ||
        text.length === 0 ||
        searchText(l[i].name, text) ||
        searchText(l[i].description, text) ||
        tags.filter(t => l[i].tags.indexOf(t) > -1).length > 0) &&
      (!type || type === "all" || type === l[i].type)
    ) {
      ret.push(stock ? {...l[i], stock: stock[l[i].code] || 0} : l[i])
      count++
    }
    if (count >= limit) break
  }
  return ret
}

const stocked = ls => (l, f) => search(l, {...f, stock: ls})

const extractCodes = prods => {
  let ret = {}
  for (let i = 0; i < prods.length; i++) {
    const code = prods[i].code
    if (code) ret[code] = i
  }
  return ret
}
const prodStyles = {
  producto: {
    style: {
      background: "#88C9DD",
      color: "#2A6046"
    },
    icon: "tag"
  },

  combo: {
    style: {
      background: "#F9EB85",
      color: "#5D5832"
    },
    icon: "tags"
  },
  servicio: {
    style: {
      background: "#F99FF1",
      color: "#5D3C5A"
    },
    icon: "safety-certificate"
  }
}

const getStyleByTypeProd = (type, options) => {
  return (
    prodStyles[type] || {
      style: {
        background: "#F99FF1",
        color: "#5D3C5A"
      },
      icon: "safety-certificate"
    }
  )
}
const calcTotal = price => {
  const {dolarizado, dolarFinal = 0, final, cotizacion = 0, iva = 21} = price
  const total = dolarizado ? dolarFinal * cotizacion : final
  const ret = {...price, total, tax: total * (iva / 100)}
  return ret
}
const changeCost = (price, cost) => {
  const {gain = 0} = price
  return calcTotal({...price, cost, final: cost * (1 + gain / 100)})
}
const changeGain = (price, gain) => {
  const {cost = 0, dolar = 0} = price
  return calcTotal({
    ...price,
    gain,
    final: cost * (1 + gain / 100),
    dolarFinal: dolar * (1 + gain / 100)
  })
}
const changeDolar = (price, dolar) => {
  const {gain = 0} = price
  return calcTotal({...price, dolar, dolarFinal: dolar * (1 + gain / 100)})
}
const changeIva = (price, iva) => {
  return calcTotal({...price, iva})
}
const changePrice = (price, final) => {
  const {gain = 0} = price
  if (gain > 0) {
    //change gain
    return calcTotal({...price, cost: final / (100 / gain), final})
  } else {
    return calcTotal({...price, cost: final, final})
  }
}
const changeFinalDolar = (price, dfinal) => {
  const {gain = 0} = price
  return calcTotal({
    ...price,
    dolar: dfinal / (1 + gain / 100),
    dolarFinal: dfinal
  })
}

const modifyPrice = (oldPrice = {}, price) => {
  const {cost = 0, gain = 0, final = 0, dolar = 0, dolarFinal, iva = 21} =
    price || {}
  if (oldPrice.cost !== cost) {
    return changeCost(oldPrice, cost)
  } else if (oldPrice.gain !== gain) {
    return changeGain(oldPrice, gain)
  } else if (oldPrice.final !== final) {
    return changePrice(oldPrice, final)
  } else if (oldPrice.dolar !== dolar) {
    return changeDolar(oldPrice, dolar)
  } else if (oldPrice.dolarFinal !== dolarFinal) {
    return changeFinalDolar(oldPrice, dolarFinal)
  } else if (oldPrice.iva !== iva) {
    return changeIva(oldPrice, iva)
  }
  return calcTotal(price)
}

export {
  changePrice,
  changeDolar,
  changeGain,
  changeCost,
  search,
  extractCodes,
  validateProduct,
  getStyleByTypeProd,
  prodStyles,
  stocked,
  modifyPrice
}
