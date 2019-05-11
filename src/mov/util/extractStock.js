import {isMercaIn} from "./checkerMov"
export default mov => {
  let stock = {}
  const s = isMercaIn(mov.type) ? 1 : -1
  for (let i = 0; i < mov.items.length; i++) {
    const p = mov.items[i]
    if (p.combo && p.combo.subitems) {
      for (let j = 0; j < p.combo.subitems.length; j++) {
        const q = p.combo.subitems[j]
        stock[q.code] = q.count * s
      }
    } else {
      stock[p.code] = p.count * s
    }
  }
  return stock
}
