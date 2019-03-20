import {displayError} from "./actions"
const saveEntity = param => {
  const {entity, type, getErrors, key} = param
  const plural = type + "s"
  const errorCapture = getErrors || (() => false)
  const errors = errorCapture(entity)
  if (errors) {
    return Promise.reject(errors)
  }

  if (window.externalLoaded) {
    return window.external.saveEntity(plural, JSON.stringify(entity))
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
  if (window.externalLoaded) {
    return window.external
      .getEntity(entities)
      .then(l => l.filter(filter))
      .catch(displayError)
  }
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
