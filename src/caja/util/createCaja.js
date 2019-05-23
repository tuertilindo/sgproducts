const ObjectID = require("bson-objectid")

export default user => {
  if (!user) throw Error("No puede crear una caja sin un usuario")
  const code = ObjectID.generate()
  return {
    createdAt: new Date(),
    createdBy: user,
    title: "caja: " + code,
    status: "open",
    code: code
  }
}
