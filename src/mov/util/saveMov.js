import transformMov from "./transformMov"
import {getConfig, saveConfig} from "../../general"
export default mov => {
  const mymov = transformMov(mov)

  return new Promise((done, error) => {
    if (mymov.errors.length === 0) {
      const movs = JSON.parse(localStorage.getItem("movs")) || {}
      movs[mymov.code] = mymov
      localStorage.setItem("movs", JSON.stringify(movs))
      if (mymov.type === "venta") {
        //guardar el ultimo
        const {ventaTarget} = getConfig()
        if (ventaTarget === "ultimo") {
          saveConfig({lastClient: mymov.target})
        }
      }
      done()
    } else {
      error()
    }
  })
}
