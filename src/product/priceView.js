import React from "react"
import {Statistic} from "antd"
import {roundStyle} from "../general"
export default class extends React.Component {
  render() {
    const {
      product,
      value,
      style,
      rounded,
      colored,
      ideal,
      title,
      size = 16
    } = this.props
    const round = rounded ? roundStyle : null
    let ret = value
    if (product && product.price) {
      const {price} = product || {}
      const {final = 0} = price

      ret = final
    }
    let color = "#1111aa"
    if (colored) {
      if (ret > 0) {
        color = "#9568F0"
      } else if (ret < 0) {
        color = "#E14D4D"
      } else {
        color = "#DACBCB"
      }
    } else if (ideal) {
      if (ret > 0) {
        color = "#9568F0"
      } else if (ret < 0) {
        color = "#E14D4D"
      } else {
        color = "#DACBCB"
      }
    }
    return (
      <Statistic
        title={title}
        value={ret}
        precision={2}
        valueStyle={{
          ...{color, fontSize: size + "px"},
          ...style,
          ...round
        }}
        prefix="$"
      />
    )
  }
}
