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
    email: {
      email: {
        message: "No parece un email válido"
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

const getStyleByClientType = type => {
  return (
    clientStyles[type] || {
      style: {
        background: "#88C9DD",
        color: "#2A6046"
      },
      icon: "file-ppt"
    }
  )
}

const search = (l, f) => {
  const {text, type} = f

  return l.filter(i => {
    return (
      (!text || text.length === 0 || searchText(i.name, text)) &&
      (!type || type === "all" || type === i.type)
    )
  })
}

export {getStyleByClientType, search, validateClient, clientStyles}
