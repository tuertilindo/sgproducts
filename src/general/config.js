const getConfig = () => {
  if (!window.sgconfig) {
    window.sgconfig = JSON.parse(localStorage.getItem("config")) || {}
  }
  return window.sgconfig
}
const saveConfig = config => {
  const cfg = {...getConfig(), ...config}
  window.sgconfig = cfg
}

export {getConfig, saveConfig}
