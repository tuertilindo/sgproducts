import React from "react"
import { Badge, Tooltip } from "antd"

export default class extends React.Component {
  render() {
    const { product } = this.props
    const { metrica = "u", stock = 0, ideal = 10 } = product || {}
    let title = "no tenemos"
    let status = "default"
    if (stock > 0) {
      if (stock < ideal) {
        status = "warning"
        title = "quedan pocos"
      } else {
        status = "success"
        title = "hay stock"
      }
    } else if (stock < 0) {
      status = "danger"
      title = "esta sobre-vendido"
    }
    return (
      <Tooltip title={title}>
        <Badge status={status}>
          <span>{stock.toFixed(2) + metrica}</span>
        </Badge>
      </Tooltip>
    )
  }
}
