import React from "react"
import { List as Lista } from "../general"
import Price from "../product/priceView"
import { Button, Icon, Tooltip, Avatar, Popconfirm } from "antd"
import { getStyleByPay } from "./util"
import "../general/decimal.css"

const createButton = (payType, title, enable, onClick) => {
  const style = getStyleByPay(payType)

  return (
    <Tooltip title={title} mouseEnterDelay={1}>
      <Button
        disabled={!enable}
        ghost={!enable}
        onClick={onClick}
        style={style.style}
        icon={style.icon}
        shape="round"
      >
        <Icon type="plus" />
      </Button>
    </Tooltip>
  )
}
export default class extends React.Component {
  render() {
    const { mov, onUpdate } = this.props
    const { pagos = {}, total = 0 } = mov
    const { efectivo, vuelto, tarjeta, cuenta, cheque, pagado } = pagos
    let list = []
    if (efectivo)
      list.push({
        name: "Pago en efectivo",
        type: "efectivo",
        price: efectivo.total
      })

    return (
      <div>
        <Button.Group size="default">
          {createButton("efectivo", "Pagar en efectivo", pagado < total, () =>
            onUpdate({ ...pagos, efectivo: { total } })
          )}
          {createButton("vuelto", "Dar vuelto", pagado > total, () =>
            console.log("efectivo")
          )}
          {createButton("tarjeta", "Pagar con tarjeta", false, () =>
            console.log("efectivo")
          )}
          {createButton("cuenta", "Acreditar a cuenta corriente", false, () =>
            console.log("efectivo")
          )}
          {createButton("cheque", "Pagar con cheque", false, () =>
            console.log("efectivo")
          )}
        </Button.Group>
        <Lista
          emptyText="no hizo ningún pago"
          emptyIcon="dollar"
          items={list}
          typeStyler={getStyleByPay}
          extraList={[
            item => (
              <Popconfirm
                title="¿Quitar pago?"
                onConfirm={() => {
                  pagos[item.type] = null
                  Promise.resolve(onUpdate(pagos))
                }}
                icon={
                  <Icon
                    type="delete"
                    style={{
                      color: getStyleByPay(item.type, { value: item.price })
                        .style.color,
                      borderRadius: "1.2em",
                      borderSize: "1px",
                      borderColor: "red"
                    }}
                  />
                }
                okText={"eliminar"}
                cancelText={null}
                okType="danger"
              >
                <span>
                  <Price
                    value={item.price}
                    rounded
                    style={{
                      color: getStyleByPay(item.type, { value: item.price })
                        .style.color
                    }}
                  />
                </span>
              </Popconfirm>
            )
          ]}
        />
      </div>
    )
  }
}
