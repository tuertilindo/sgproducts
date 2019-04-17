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

  return rest
}

const search = (l, f) => {
  const {text, type, tags} = f

  return l.filter(i => {
    return (
      (!text ||
        text.length === 0 ||
        searchText(i.name, text) ||
        searchText(i.description, text)) &&
      (!type || type === "all" || type === i.type)
    )
  })
}

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

const changeCost = (price, cost) => {
  const {gain = 0} = price
  return {...price, cost, final: cost * (1 + gain / 100)}
}
const changeGain = (price, gain) => {
  const {cost = 0, dolar = 0} = price
  return {
    ...price,
    gain,
    final: cost * (1 + gain / 100),
    dolarFinal: dolar * (1 + gain / 100)
  }
}
const changeDolar = (price, dolar) => {
  const {gain = 0} = price
  return {...price, dolar, dolarFinal: dolar * (1 + gain / 100)}
}
const changePrice = (price, final) => {
  const {cost = 0, gain = 0} = price
  const calcFinal = cost * (1 + gain / 100)
  if (cost > 0 && gain > 0 && final >= calcFinal) {
    return {...price, gain: ((final - cost) * 100) / cost, final}
  } else if (cost > 0 && gain === 0 && final >= cost) {
    return {...price, cost: final, final}
  } else if (cost > 0 && gain === 0 && final < cost) {
    return {...price, final: cost}
  } else if (cost > 0 && gain > 0 && final < calcFinal) {
    return {...price, final: calcFinal}
  }
  return {...price, gain: 0, final, cost: final}
}
const updatePrice = (price, final) => {
  const {
    dolarizado = false,
    dolarFinal = 0,
    cotizacion = 0,
    cost = 0,
    gain = 0
  } = price
  const calcFinal = cost * (1 + gain / 100)
  if (cost > 0 && gain > 0 && final >= calcFinal) {
    return {...price, gain: ((final - cost) * 100) / cost, final}
  } else if (gain === 0) {
    return {...price, cost: final, final}
  } else if (cost > 0 && gain > 0 && final < calcFinal) {
    return {...price, costo: final / (1 + gain / 100)}
  }

  const total = dolarizado ? dolarFinal * cotizacion : final
  return {...price, total}
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
  updatePrice
}
