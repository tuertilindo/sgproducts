import {isEmpty} from "./util"
import {createCaja, calculateStock} from "../caja/util"

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

const getCaja = () => {
  const c = JSON.parse(localStorage.getItem("caja"))
  return Promise.resolve(c)
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
        done(entity)
      } catch (e) {
        error(e)
      }
    })
  },
  saveMov: (mymov, status = "done") => {
    const mov = {...mymov, status}
    return getCaja().then(c => {
      let caja = c || {}
      let movs = caja.movs || {}

      movs[mov.type] = [
        mov,
        ...(movs[mov.type] || []).filter(m => m.code !== mov.code)
      ]
      caja.movs = movs
      localStorage.setItem("caja", JSON.stringify(caja))
      return mov
    })
  },
  changeCaja: user => {
    return getCaja().then(c => {
      if (c) {
        const entities = JSON.parse(localStorage.getItem("cajas")) || {}
        entities[c.code] = c
        localStorage.setItem("cajas", JSON.stringify(entities))
      }
      const caja = createCaja(user)
      localStorage.setItem("caja", JSON.stringify(caja))
      return Promise.resolve(caja)
    })
  },
  getCaja,
  getEntity,
  getEntities,
  removeEntity,

  login: (email, password, remember) => {
    return getEntities("users").then(usrs => {
      const found = usrs.filter(
        u => u.email === email && u.password === password
      )
      if (found.length > 0) {
        if (remember) {
          return window.sgapi.saveEntity(found[0], "logged")
        }
        return Promise.resolve(found[0])
      }
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
