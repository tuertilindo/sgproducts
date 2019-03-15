export default () => {
  return new Promise((done, error) => {
    try {
      const movs = JSON.parse(localStorage.getItem("movs")) || {}
      done(movs)
    } catch (e) {
      error(e.message)
    }
  })
}
