import React from "react"
import { List as Lista } from "../general"
import Price from "../product/priceView"
import { Badge, Icon, Tooltip, Avatar, Popconfirm } from "antd"
import { getStyleByDesc } from "./util"
import "../general/decimal.css"
export default class extends React.Component {
  render() {
    const { descuentos, onUpdate, onAdd, onDelete } = this.props
    return (
      <div>
        <Lista
          emptyText="no hizo ningún descuento"
          emptyIcon="like"
          items={descuentos}
          avatar={item => {
            const { price, label, percent, type } = item
            const { style, icon } = getStyleByDesc(type, { value: price })
            return (
              <Badge
                count={<Icon type={icon} style={{ color: style.color }} />}
              >
                <Tooltip title={label + " " + percent}>
                  <Avatar style={style}>{percent}</Avatar>
                </Tooltip>
                ,
              </Badge>
            )
          }}
          extraList={[
            item =>
              item.type === "custom" ? (
                <Popconfirm
                  title="¿Está seguro que desea eliminar?"
                  onConfirm={() => Promise.resolve(onDelete(item))}
                  icon={
                    <Icon
                      type="delete"
                      style={{
                        color: getStyleByDesc(item.type, { value: item.price })
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
                        color: getStyleByDesc(item.type, { value: item.price })
                          .style.color
                      }}
                    />
                  </span>
                </Popconfirm>
              ) : (
                <Price
                  value={item.price}
                  style={{
                    color: getStyleByDesc(item.type, { value: item.price })
                      .style.color
                  }}
                />
              )
          ]}
        />
      </div>
    )
  }
}
