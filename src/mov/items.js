import React from "react"
import {List as Lista, EditableNumber} from "../general"
import ItemInfo from "./itemInfo"
import {Badge, Icon, Button} from "antd"
import Prodview from "../product/view"
import "../general/decimal.css"
export default class extends React.Component {
  render() {
    const {items, onUpdate, onAdd, onDelete} = this.props
    return (
      <div>
        {onAdd ? <Prodview justSelect onSelect={p => onAdd(p)} /> : null}
        <Lista
          emptyText="Aun no agrego ningún producto"
          emptyIcon="shopping-cart"
          items={items}
          avatar={item => {
            const {metrica, count} = item
            return (
              <EditableNumber
                suffix={metrica}
                title="Cambiar la cantidad"
                count={count}
                onUpdate={
                  onUpdate
                    ? newCount => onUpdate({...item, count: newCount})
                    : null
                }
              />
            )
          }}
          extraList={[
            item => {
              const {newPrice, count, price} = item
              return (
                <EditableNumber
                  prefix="$"
                  title="Cambiar el precio unitario"
                  valueStyle={{
                    color: "#1122bb",
                    fontSize: "10px",
                    fontWeight: "200"
                  }}
                  count={newPrice > 0 ? newPrice : price}
                  onUpdate={
                    onUpdate
                      ? newPrice =>
                          onUpdate({
                            ...item,
                            newPrice,
                            newTotal: newPrice * count
                          })
                      : null
                  }
                />
              )
            },
            item => {
              const {newPrice, count, price, newTotal, total} = item
              const hasTax = newPrice - price
              const itax = hasTax > 0 ? "rise" : "fall"
              const icolor = hasTax > 0 ? "#22f52d" : "#f5222d"
              return (
                <Badge
                  count={
                    hasTax ? <Icon type={itax} style={{color: icolor}} /> : 0
                  }
                >
                  <EditableNumber
                    prefix="$"
                    title="Cambiar el precio total"
                    valueStyle={{
                      color: "#44bb44",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                    count={newTotal > 0 ? newTotal : total}
                    onUpdate={
                      onUpdate
                        ? newTotal =>
                            onUpdate({
                              ...item,
                              newTotal,
                              newPrice: newTotal / count
                            })
                        : null
                    }
                  />
                </Badge>
              )
            },
            item => (
              <ItemInfo
                item={item}
                action={
                  onDelete ? (
                    <Button
                      onClick={() => onDelete(item)}
                      size="small"
                      type="danger"
                    >
                      quitar
                    </Button>
                  ) : null
                }
              />
            )
          ]}
        />
      </div>
    )
  }
}
