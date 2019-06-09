export default items => {
  let ntotal = 0
  let nitems = []
  let descuentos = []
  let taxes = {}
  for (let i = 0; i < items.length; i++) {
    const count = parseFloat(items[i].count || 0)
    const price = parseFloat(items[i].price || 0)
    const code = items[i].code || "unknow"
    const name = items[i].name || "unknow"
    const iva = parseFloat(items[i].iva || 21)
    const newPrice = parseFloat(items[i].newPrice)
    const combo = items[i].count || {}
    const total = count * price
    const newTotal = count * newPrice || total
    const tax = newTotal * (iva / 100)
    const diff = total - newTotal
    const scalar = total > 0 ? newTotal / total : 1

    if (count > 0) {
      //calcular descuento
      if (diff !== 0) {
        let percent = (scalar * 100 - 100).toFixed(2) + "%"
        let label = diff < 0 ? "descuento" : "interes"
        descuentos.push({
          name: name,
          price: diff,
          codes: [code],
          percent,
          scalar,
          label,
          type: "custom"
        })
      }

      //calcular combo
      let ncombo = null

      if (
        combo &&
        newTotal > 0 &&
        combo.subitems &&
        combo.subitems.length > 0
      ) {
        const {subitems = []} = combo
        let ntotal = 0
        let nsubitems = []
        for (let i = 0; i < subitems.length; i++) {
          const {count, name, code, price} = subitems[i]
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
        const nscalar = ntotal / newTotal
        const ndesc = ntotal - newTotal
        let nlabel = ndesc < 0 ? "descuento" : "interes"
        descuentos.push({
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
        iva,
        count,
        price,
        total,
        newPrice,
        newTotal,
        tax,
        diff,
        combo: ncombo
      })
      taxes[iva + "%"] = taxes[iva + "%"] + tax
      ntotal += newTotal
    }
  }
  let ivaTotal = taxes.reduce((a, b) => a + b, 0)
  return {
    total: ntotal,
    subtotal: ntotal - ivaTotal,
    impuestos: ivaTotal,
    taxes,
    items: nitems,
    descuentos
  }
}
