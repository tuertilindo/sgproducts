import React from "react"
import {List as Lista} from "../../general"
import Price from "../../product/priceView"
import {getStyleByPay} from "../util"
import fillPagos from "../util/fillPagos"

export default class extends React.Component {
  render() {
    const {pagos} = this.props
    const list = fillPagos(pagos)
    return (
      <Lista
        emptyText="no hizo ningún pago"
        emptyIcon="dollar"
        items={list}
        typeStyler={getStyleByPay}
        extraList={[
          item => (
            <span>
              <Price
                value={item.price}
                rounded
                style={{
                  color: getStyleByPay(item.type, {value: item.price}).style
                    .color
                }}
              />
            </span>
          )
        ]}
      />
    )
  }
}
