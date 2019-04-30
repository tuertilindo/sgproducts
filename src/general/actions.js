import {isEmpty} from "./util"

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
const getEntity = (key, entities) => {
  return new Promise((done, error) => {
    try {
      const users = JSON.parse(localStorage.getItem(entities)) || {}
      const item = users[key]
      if (item) done(item)
      else error({message: "no se encontro el item"})
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
    const key = entity._id || entity.code || entity.email
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
  getEntity,
  getEntities,
  removeEntity,

  login: (email, password) => {
    return getEntities("users").then(usrs => {
      const found = usrs.filter(
        u => u.email === email && u.password === password
      )
      if (found.length > 0) return Promise.resolve(found[0])
      return Promise.reject({message: "Las credenciales no coinciden"})
    })
  },
  logged: () => {
    return getEntities("logged").then(user => {
      if (!isEmpty(user)) {
        return Promise.resolve(user[0])
      }
      return Promise.reject()
    })
  },

  logout: user => {
    return removeEntity(user.email, "logged")
  },
  getConfig: () => {
    const cf = JSON.parse(localStorage.getItem("config"))
    return Promise.resolve(cf)
  },
  initConfig: () => {
    const cf = JSON.parse(localStorage.getItem("config"))
    window.sgconfig = cf
    return Promise.resolve(cf)
  },
  setConfig: cfg => {
    const cf = JSON.parse(localStorage.getItem("config"))
    const fcfg = {...cf, ...cfg}
    localStorage.setItem("config", JSON.stringify(fcfg))
    return Promise.resolve(fcfg)
  }
}
export default api
