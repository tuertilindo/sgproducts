const getConfig = () => window.sgconfig || {}
const initConfig = () => {
  return window.sgapi.getConfig().then(c => {
    window.sgconfig = c
    return c
  })
}
const saveConfig = config => {
  const cfg = {...getConfig(), ...config}
  window.sgconfig = cfg
  window.sgapi.setConfig(config)
}

export {getConfig, saveConfig, initConfig}
