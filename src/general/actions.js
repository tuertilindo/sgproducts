import {saveEntity, getEntities, removeEntity} from "./entities"
import {message} from "antd"

const displayError = e => {
  const msg = e.message ? e.message : e
  message.error(msg)
}

const login = params => {
  const {email, password, remember} = params
  if (window.externalLoaded) {
    return window.external.login(email, password, remember).catch(displayError)
  }
  return getEntities("users", u => u.email === email && u.password === password)
    .then(usrs => {
      if (usrs.length > 0) {
        const usr = usrs[0]
        if (remember) saveEntity({entity: usr, type: "login", key: email})
        return usr
      }
      return null
    })
    .catch(displayError)
}

const logout = user => {
  if (window.externalLoaded) {
    return window.external.logout(user).catch(displayError)
  }
  removeEntity(user.email, "logins")
}

export {displayError, login, logout}
