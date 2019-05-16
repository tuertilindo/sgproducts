import {isMoneyIn, isMoneyOut} from "./checkerMov"
export default mov => {
  const {efectivo, cheque, tarjeta, cuenta} = mov.pagos || {}
  const s = isMoneyIn(mov.type) ? 1 : isMoneyOut(mov.type) ? -1 : 0
  return {
    efectivo: efectivo && efectivo.total ? efectivo.total * s : 0,
    cheque: cheque && cheque.total ? cheque.total * s : 0,
    tarjeta: tarjeta && tarjeta.total ? tarjeta.total * s : 0,
    cuenta: cuenta && cuenta.total ? cuenta.total * s : 0
  }
}
