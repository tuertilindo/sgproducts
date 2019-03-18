const saveEntity = param => {
  const {entity, type, getErrors, key} = param
  const plural = type + "s"
  const errorCapture = getErrors || (() => false)
  return new Promise((done, error) => {
    if (!errorCapture(entity)) {
      const entities = JSON.parse(localStorage.getItem(plural)) || {}
      entities[key] = entity
      localStorage.setItem(plural, JSON.stringify(entities))
      done()
    } else {
      error()
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
const getEntity = (key, group) => {
  return getEntities(group).then(g =>
    Number.isInteger(key) ? Object.values(g)[key] : g[key]
  )
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

export {getEntities, saveEntity, getEntity, removeEntity}
