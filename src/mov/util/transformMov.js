import checkIsMercaMov from "./checkIsMercaMov"
import { isEmpty } from "../../general"
import getDestTypePerMov from "./getDestTypePerMov"
import calculatePagos from "./calculatePagos"

export default mov => {
  let {
    items = [],
    descuentos = [],
    pagos = {},
    target = {},
    status,
    type,
    tags = [],
    date,
    code,
    factura,
    user
  } = mov

  let nitems = []
  let customDescuentos = []
  let ivas = {}
  let subtotal = 0
  let descontado = 0
  let errors = []
  if (checkIsMercaMov(type)) {
    if (items.length > 0) {
      //items
      for (let i = 0; i < items.length; i++) {
        let {
          count = 0,
          price = 0,
          code = "unknow",
          name = "unknow",
          iva = 21,
          newPrice,
          combo
        } = items[i]

        const c = parseFloat(count)
        const p = parseFloat(price)
        const t = c * p
        if (c > 0) {
          //calcular descuento
          let np = newPrice ? parseFloat(newPrice) : p
          let nt = np * c

          const desc = nt - t
          const scalar = nt / t
          if (desc !== 0) {
            let percent = (scalar * 100 - 100).toFixed(2) + "%"
            let label = desc < 0 ? "descuento" : "interes"
            customDescuentos.push({
              name: name,
              price: desc,
              codes: [code],
              percent,
              scalar,
              label,
              type: "custom"
            })
          }

          //calcular combo
          let ncombo = null
          if (combo && nt > 0 && combo.subitems && combo.subitems.length > 0) {
            const { subitems = [], scalar = 1 } = combo
            let ntotal = 0
            let nsubitems = []
            for (let i = 0; i < subitems.length; i++) {
              const { count, name, code, price } = subitems[i]
              const sbcount = parseFloat(count)
              const sbprice = parseFloat(price)
              const sbtotal = sbcount * sbprice
              nsubitems.push({
                count: sbcount,
                name,
                code,
                price: sbprice,
                total: sbtotal
              })
              ntotal += sbtotal
            }
            const nscalar = ntotal / nt
            const ndesc = ntotal - nt
            let nlabel = ndesc < 0 ? "descuento" : "interes"
            customDescuentos.push({
              name: name,
              price: ndesc,
              codes: [code],
              percent: (nscalar * 100 - 100).toFixed(2) + "%",
              scalar: nscalar,
              label: nlabel + " por combo",
              type: "combo"
            })
            ncombo = {
              scalar: nscalar,
              subitems: nsubitems
            }
          }

          nitems.push({
            id: i,
            name,
            code,
            count: c,
            price: p,
            total: t,
            newPrice: np,
            newTotal: nt,
            status,
            type,
            tags,
            combo: ncombo
          })
          const niva = nt - nt / (1 + iva / 100)
          ivas[iva + "%"] = ivas[iva + "%"] + niva || niva
          subtotal += nt
        }
      }

      //descuentos
      for (let i = 0; i < descuentos.length; i++) {
        const { price, codes = [], type } = descuentos[i]
        const d = parseFloat(price)
        descuentos[i].price = d

        if (type !== "custom") {
          if (items.filter(i => codes.indexOf(i.code) > -1) > 0) {
            customDescuentos.push(descuentos[i])
            descontado += d
          }
        }
      }

      //ivas
      for (var key in ivas) {
        if (ivas.hasOwnProperty(key)) {
          customDescuentos.push({
            name: "total de IVA al " + key,
            price: ivas[key],
            percent: key,
            label: "impuesto",
            type: "iva"
          })
        }
      }
    } else {
      errors.push({
        index: errors.length,
        type: "warning",
        message: "Aun no agrego productos"
      })
    }
  }

  //target
  const destType = getDestTypePerMov(type)
  if (destType === "desconocido") {
    errors.push({
      index: errors.length,
      type: "error",
      message: "No se reconoce el tipo de movimiento"
    })
  } else {
    if (
      isEmpty(target) ||
      isEmpty(target.name) ||
      isEmpty(target.code) ||
      isEmpty(target.type) ||
      target.type !== destType
    ) {
      errors.push({
        index: errors.length,
        type: "warning",
        message: "Debe asignar un " + destType + " a este movimiento"
      })
      target = {}
    }
  }

  //factura
  if (type === "pedido" || type === "presupuesto") {
    factura = "P"
  } else if (type === "deposito" || type === "extraccion") {
    factura = "R"
  } else if (type === "deposito" || type === "extraccion") {
    factura = "R"
  } else if (type === "entrada" || type === "salida") {
    factura = "X"
  }

  const mpagos = calculatePagos(pagos)
  const pagado = mpagos.pagado
  const total = subtotal + descontado
  if (total > pagado) {
    errors.push({
      index: errors.length,
      type: "warning",
      message: "Faltan realizar pagos"
    })
  }
  if (total < pagado) {
    errors.push({
      index: errors.length,
      type: "warning",
      message: "Falta dar vueltos"
    })
  }

  let ret = {
    items: nitems,
    name: target.name || "desconocido",
    subtotal,
    errors,
    target,
    total,
    descontado,
    descuentos: customDescuentos,
    pagos: mpagos,
    pagado,
    status,
    type,
    tags,
    date,
    code,
    factura,
    user
  }
  return ret
}
