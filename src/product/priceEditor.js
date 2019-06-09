import React from "react"
import {FieldEditor} from "../general"
import {modifyPrice} from "./util"
import "../general/decimal.css"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.price || {}
  }
  componentDidUpdate(prevProps, prevState) {
    const {price} = this.props
    if (
      prevState.price !== this.state.price &&
      price &&
      prevProps.price &&
      price.final !== prevProps.final
    ) {
      this.setState({price: price})
    }
  }

  doUpdate(price) {
    const newPrice = {...this.state, ...price}
    const {
      dolarizado = false,
      dolarFinal = 0,
      final = 0,
      cotizacion = 0
    } = newPrice

    const total = dolarizado ? dolarFinal * cotizacion : final
    const finalPrice = {...newPrice, total}
    const {onPriceUpdate} = this.props
    if (onPriceUpdate) onPriceUpdate(finalPrice)
    //this.setState(finalPrice)
  }

  render() {
    const {price, errors} = this.props

    return (
      <FieldEditor
        fields={{
          dolarizado: {
            value: price.dolarizado,
            title: "Precio en dolares",
            icon: "transaction",
            on: "Dolar",
            off: "Pesos",
            description: " Cambia la moneda"
          },
          cost: {
            value: price.cost,
            title: "Precio de costo",
            icon: "fire",
            numeric: true,
            hidden: price.dolarizado
          },
          dolar: {
            value: price.dolar || 0,
            title: "Costo en Dolares",
            icon: "dollar",
            numeric: true,
            hidden: !price.dolarizado
          },
          gain: {
            value: price.gain,
            title: "Ganancia porcentual",
            icon: "percentage",
            numeric: true
          },
          final: {
            value: price.final,
            title: "Precio final en pesos",
            icon: "dollar",
            numeric: true,
            hidden: price.dolarizado
          },

          dolarFinal: {
            value: price.dolarFinal || 0,
            title: "Precio final en dolares",
            icon: "dollar",
            numeric: true,
            hidden: !price.dolarizado
          },
          cotizacion: {
            value: price.cotizacion || 1,
            title: "Cotización",
            icon: "dollar",
            numeric: true,
            hidden: !price.dolarizado
          },
          iva: {
            value: price.iva,
            title: "IVA",
            icon: "percentage",
            values: ["21", "10.5"]
          }
        }}
        errors={errors}
        onChange={o =>
          this.setState({price: modifyPrice(price, {...price, ...o})})
        }
      />
    )
  }
}
