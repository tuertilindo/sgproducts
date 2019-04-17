const getConfig = () => {
  if (!window.sgconfig) {
    window.sgconfig = window.sgapi.getEntity(0, "config") || {}
  }
  return window.sgconfig
}
const saveConfig = config => {
  const cfg = {...getConfig(), ...config}
  window.sgconfig = cfg
  cfg.code = 0
  window.sgapi.saveEntity(cfg, "config")
}

export {getConfig, saveConfig}
