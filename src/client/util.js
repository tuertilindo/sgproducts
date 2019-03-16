import {searchText} from "../general/"
const validate = require("validate.js")
const validateClient = client => {
  const constraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: "El destinatario no tiene nombre"
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
    }
  }
  const rest = validate(client, constraints, {fullMessages: false})

  return rest
}
const clientStyles = {
  cliente: {
    style: {
      background: "#75FF70",
      color: "#5E3232"
    },
    icon: "shopping-cart"
  },
  responsable: {
    style: {
      background: "#88C9DD",
      color: "#2A6046"
    },
    icon: "file-ppt"
  },

  proveedor: {
    style: {
      background: "#F9EB85",
      color: "#5D5832"
    },
    icon: "hdd"
  },
  sucursal: {
    style: {
      background: "#DA8BD3",
      color: "#52335F"
    },
    icon: "cloud-upload"
  },
  financiera: {
    style: {
      background: "#F99FF1",
      color: "#5D3C5A"
    },
    icon: "inbox"
  }
}

const getStyleByClientType = (type, options) => {
  let c = "#556aFF"
  let b = "#ddddfd"
  let i = "edit"
  const {onlyColor, onlyBack} = options || {}
  switch (type) {
    case "cliente":
      b = "#66F96D"
      c = "#265D29"
      i = "shopping-cart"
      break
    case "proveedor":
      b = "#F9DA66"
      c = "#5D5226"
      i = "hdd"
      break
    case "sucursal":
      b = "#F9666B"
      c = "#5D2628"
      i = "eye-invisible"
      break
    case "responsable":
      b = "#66F9F3"
      c = "#265D5B"
      i = "download"
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

const search = (l, f) => {
  const {text, type, tags} = f

  return l.filter(i => {
    return (
      (!text ||
        text.length === 0 ||
        searchText(i.name || i.target.name, text)) &&
      (!type || type === "all" || type === i.type)
    )
  })
}
const saveClient = client => {
  return new Promise((done, error) => {
    if (!validateClient(client)) {
      const prods = JSON.parse(localStorage.getItem("clients")) || {}
      prods[client.code] = client
      localStorage.setItem("clients", JSON.stringify(prods))
      done()
    } else {
      error()
    }
  })
}
const getClients = () => {
  return new Promise((done, error) => {
    try {
      const clients = JSON.parse(localStorage.getItem("clients")) || {}
      done(clients)
    } catch (e) {
      error(e.message)
    }
  })
}

export {
  getStyleByClientType,
  search,
  validateClient,
  saveClient,
  getClients,
  clientStyles
}
