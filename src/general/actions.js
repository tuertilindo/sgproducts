import {isEmpty} from "./util"
const saveEntity = param => {
  const {entity, type, getErrors, key} = param
  const plural = type + "s"
  const errorCapture = getErrors || (() => false)
  const errors = errorCapture(entity)
  if (errors) {
    return Promise.reject(errors)
  }

  return new Promise((done, error) => {
    try {
      const entities = JSON.parse(localStorage.getItem(plural)) || {}
      entities[key] = entity
      localStorage.setItem(plural, JSON.stringify(entities))
      done()
    } catch (e) {
      error(e)
    }
  })
}

const getEntities = (entities, filter) => {
  return new Promise((done, error) => {
    try {
      const users = JSON.parse(localStorage.getItem(entities)) || {}
      done(filter ? Object.values(users).filter(filter) : Object.values(users))
    } catch (e) {
      error(e)
    }
  })
}

const removeEntity = (key, group) => {
  return new Promise((done, error) => {
    try {
      const entities = JSON.parse(localStorage.getItem(group)) || {}
      delete entities[key]
      localStorage.setItem(group, JSON.stringify(entities))
      done()
    } catch (e) {
      error(e.message)
    }
  })
}

const api = {
  saveEntity: (entity, type) => {
    const key = entity._id || entity.code
    return new Promise((done, error) => {
      try {
        const entities = JSON.parse(localStorage.getItem(type)) || {}
        entities[key] = entity
        localStorage.setItem(type, JSON.stringify(entities))
        done()
      } catch (e) {
        error(e)
      }
    })
  },
  login: (email, password, remember) => {
    return getEntities("users").then(usrs => {
      const usr = usrs[email]
      if (password === usr.password) {
        if (remember) localStorage.setItem("logged", JSON.stringify(usr))
        return Promise.resolve(usr)
      }
      return Promise.reject({message: "Las credenciales no coinciden"})
    })
  },
  logged: () => {
    const user = JSON.parse(localStorage.getItem("logged")) || {}
    if (!isEmpty(user)) {
      return Promise.resolve(user)
    }
    return Promise.reject()
  },

  logout: user => {
    removeEntity(user.email, "logins")
  },

  movs: () => {
    return getEntities("movs")
  },
  products: () => {
    return getEntities("products")
  },
  clients: () => {
    return getEntities("clients")
  },
  users: () => {
    return getEntities("users")
  },
  saveClient: client => {
    return saveEntity({
      type: "client",
      key: client.code,
      entity: client
    })
  },
  saveProduct: p => {
    return saveEntity({
      type: "product",
      key: p.code,
      entity: p
    })
  },
  saveMov: p => {
    return saveEntity({
      type: "mov",
      key: p.code,
      entity: p
    })
  },
  saveUser: p => {
    return saveEntity({
      type: "user",
      key: p.email,
      entity: p
    })
  }
}
export default api
