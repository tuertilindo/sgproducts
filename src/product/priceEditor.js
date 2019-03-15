import React from "react"
import { Switch, Card, Alert } from "antd"
import Number from "../general/editableNumber"
import "../general/decimal.css"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.price || {}
  }
  changeCost(price, cost) {
    const { gain = 0 } = price
    return { ...price, cost, final: cost * (1 + gain / 100) }
  }
  changeGain(price, gain) {
    const { cost = 0, dolar = 0 } = price
    return {
      ...price,
      gain,
      final: cost * (1 + gain / 100),
      dolarFinal: dolar * (1 + gain / 100)
    }
  }
  changeDolar(price, dolar) {
    const { gain = 0 } = price
    return { ...price, dolar, dolarFinal: dolar * (1 + gain / 100) }
  }
  changePrice(price, final) {
    const { cost = 0, gain = 0 } = price
    const calcFinal = cost * (1 + gain / 100)
    if (cost > 0 && gain > 0 && final >= calcFinal) {
      return { ...price, gain: ((final - cost) * 100) / cost, final }
    } else if (cost > 0 && gain === 0 && final >= cost) {
      return { ...price, cost: final, final }
    } else if (cost > 0 && gain === 0 && final < cost) {
      return { ...price, final: cost }
    } else if (cost > 0 && gain > 0 && final < calcFinal) {
      return { ...price, final: calcFinal }
    }
    return { ...price, gain: 0, final, cost: final }
  }

  doUpdate(price) {
    const newPrice = { ...this.state, ...price }
    const {
      dolarizado = false,
      dolarFinal = 0,
      final = 0,
      cotizacion = 0
    } = newPrice

    const total = dolarizado ? dolarFinal * cotizacion : final
    const finalPrice = { ...newPrice, total }
    const { onPriceUpdate } = this.props
    if (onPriceUpdate) onPriceUpdate(finalPrice)
    this.setState(finalPrice)
  }

  render() {
    const {
      final = 0,
      cost = 0,
      dolar = 0,
      gain = 0,
      dolarizado = false,
      cotizacion = 0,
      dolarFinal = 0,
      total = 0
    } = this.state
    const { error } = this.props
    return (
      <Card>
        {error ? <Alert type="error" message={error} banner /> : null}
        <div>
          <Number
            prefix="$"
            size="25"
            name="Costo"
            count={cost}
            title="Cambiar costo"
            onUpdate={v => this.doUpdate(this.changeCost(this.state, v))}
          />
          <Number
            prefix="%"
            size="30"
            name="Ganacia"
            min={0}
            count={gain}
            title="Cambiar ganancia"
            onUpdate={v => this.doUpdate(this.changeGain(this.state, v))}
          />
          <Number
            prefix="$"
            size="25"
            name="Precio"
            count={final}
            title="Cambiar el precio final"
            onUpdate={v => this.doUpdate(this.changePrice(this.state, v))}
          />
        </div>
        <div>
          <Number
            prefix="$"
            size="25"
            name="Costo dolar"
            min={0}
            color="#22bb22"
            count={dolar}
            title="Cambiar el costo en dolares"
            onUpdate={v => this.doUpdate(this.changeDolar(this.state, v))}
          />
          <Number
            prefix="%"
            size="30"
            name="Cotizacion"
            min={0}
            color="#22bb66"
            count={cotizacion}
            title="Cambiar La cotización"
            onUpdate={v => this.doUpdate({ cotizacion: v })}
          />

          <Number
            prefix="$"
            size="25"
            color="#115511"
            name="Final Dolar"
            min={0}
            count={dolarFinal}
            title="Cambiar el costo en dolares"
          />
        </div>
        <div>
          <Switch
            defaultChecked={dolarizado}
            onChange={dolarizado => {
              this.doUpdate({ dolarizado })
            }}
            checkedChildren="dolar"
            unCheckedChildren="pesos"
          />
          <Number
            prefix="$"
            size="40"
            color={dolarizado ? "#115511" : "#22aaFF"}
            name="Precio Final"
            min={0}
            count={total}
          />
        </div>
      </Card>
    )
  }
}
