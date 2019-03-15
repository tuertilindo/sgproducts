import { searchText } from "../general/"
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
  const rest = validate(product, constraints, { fullMessages: false })

  return rest
}

const search = (l, f) => {
  const { text, type, tags } = f

  return l.filter(i => {
    return (
      (!text || text.length === 0 || searchText(i.name, text)) &&
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

const getStyleByTypeProd = (type, options) => {
  let c = "#556aFF"
  let b = "#ddddfd"
  let i = "edit"
  const { onlyColor, onlyBack } = options || {}
  switch (type) {
    case "producto":
      b = "#75FF70"
      c = "#5E3232"
      i = "tag"
      break
    case "combo":
      b = "#FB8686"
      c = "#5F3F3A"
      i = "fall"
      break
    case "servicio":
      b = "#88C9DD"
      c = "#2A6046"
      i = "safety-certificate"
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

const saveProduct = product => {
  return new Promise((done, error) => {
    if (!validateProduct(product)) {
      const prods = JSON.parse(localStorage.getItem("products")) || {}
      prods[product.code] = product
      localStorage.setItem("products", JSON.stringify(prods))
      done()
    } else {
      error()
    }
  })
}
const getProducts = () => {
  return new Promise((done, error) => {
    try {
      const products = JSON.parse(localStorage.getItem("products")) || {}
      done(products)
    } catch (e) {
      error(e.message)
    }
  })
}

export {
  search,
  extractCodes,
  validateProduct,
  getStyleByTypeProd,
  saveProduct,
  getProducts
}
