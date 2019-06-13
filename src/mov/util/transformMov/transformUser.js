export default mov => {
  const {user} = mov
  let createdBy = "origen desconocido"
  let userErrors = []
  if (user) {
    createdBy = "creado por " + user.name
  } else {
    userErrors.push({
      index: userErrors.length,
      type: "error",
      message: "no hay un usuario asociado al movimiento"
    })
  }
  return {
    createdBy,
    user,
    userErrors
  }
}
