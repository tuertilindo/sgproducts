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
      done(filter ? Object.values(users).filter(filter) : users)
    } catch (e) {
      error(e.message)
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
  login: (email, password, remember) => {
    return getEntities("users").then(usrs => {
      const usr = usrs[email]
      if (remember) saveEntity({entity: usr, type: "login", key: email})
      return usr
    })
  },
  logged: () => getEntities("logins").then(u => u[0]),

  logout: user => {
    removeEntity(user.email, "logins")
  },

  movs: () => {
    return getEntities("movs")
  },
  products: () => {
    return getEntities("movs")
  },
  clients: () => {
    return getEntities("movs")
  },
  users: () => {
    return getEntities("movs")
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
