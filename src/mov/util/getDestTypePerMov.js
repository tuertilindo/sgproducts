export default movType => {
  switch (movType) {
    case "venta":
    case "devolucion":
    case "presupuesto":
      return "cliente"
    case "compra":
    case "retorno":
    case "pedido":
      return "proveedor"
    case "entrada":
    case "salida":
      return "sucursal"
    case "deposito":
    case "extraccion":
      return "responsable"

    default:
      return "desconocido"
  }
}
