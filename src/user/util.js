import {searchText} from "../general/"
const validate = require("validate.js")
const validateUser = user => {
  const constraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: "El usuario no tiene nombre"
      },
      length: {
        minimum: 3,
        maximum: 40,
        tooLong: "El nómbre es demasiado largo",
        tooShort: "El nómbre es demasiado corto"
      }
    },
    email: {
      presence: {
        allowEmpty: false,
        message: "El usuario no tiene correo"
      },
      email: {
        message: "No parece un email válido"
      }
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "El usuario no tiene contraseña"
      },
      length: {
        minimum: 5,
        maximum: 26,
        tooLong: "La contraseña es demasiado larga",
        tooShort: "La contraseña es demasiado corta"
      }
    }
  }
  const rest = validate(user, constraints, {fullMessages: false})

  return rest
}
const validateLoguin = user => {
  const constraints = {
    email: {
      presence: {
        allowEmpty: false,
        message: "El usuario no tiene correo"
      },
      email: {
        message: "No parece un email válido"
      }
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "El usuario no tiene contraseña"
      },
      length: {
        minimum: 5,
        maximum: 26,
        tooLong: "La contraseña es demasiado larga",
        tooShort: "La contraseña es demasiado corta"
      }
    }
  }
  const rest = validate(user, constraints, {fullMessages: false})

  return rest
}

const userStyles = {
  cliente: {
    style: {
      background: "#75FF70",
      color: "#5E3232"
    },
    icon: "shopping-cart"
  },
  vendedor: {
    style: {
      background: "#88C9DD",
      color: "#2A6046"
    },
    icon: "file-ppt"
  },

  encargado: {
    style: {
      background: "#F9EB85",
      color: "#5D5832"
    },
    icon: "hdd"
  },
  contador: {
    style: {
      background: "#DA8BD3",
      color: "#52335F"
    },
    icon: "cloud-upload"
  },
  admin: {
    style: {
      background: "#F99FF1",
      color: "#5D3C5A"
    },
    icon: "inbox"
  },
  invitado: {
    style: {
      background: "#F99FF1",
      color: "#5D3C5A"
    },
    icon: "inbox"
  }
}

const getStyleByUserType = type => {
  return (
    userStyles[type] || {
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
      (!text ||
        text.length === 0 ||
        searchText(i.name, text) ||
        searchText(i.email, text)) &&
      (!type || type === "all" || type === i.type)
    )
  })
}

export {getStyleByUserType, search, validateUser, userStyles, validateLoguin}
