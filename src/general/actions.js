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
  getEntities,
  removeEntity,

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
  }
}
export default api
