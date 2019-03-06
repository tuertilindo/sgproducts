import React from "react";
import { Icon, Badge } from "antd";
import Search from "./prodSelector";
import Listitem from "./listItem";
import List from "./list";
import EditableNumber from "./editableNumber";
import "./list.css";
class Li extends React.Component {
  render() {
    const { item, onDelete, onUpdate } = this.props || [];
    const {
      count = 0,
      name = "unk",
      price = 0,
      newPrice,
      newTotal,
      metrica = "u",
      total
    } = item;
    const hasTax = newPrice - price;
    const itax = hasTax > 0 ? "rise" : "fall";
    const icolor = hasTax > 0 ? "#22f52d" : "#f5222d";
    return (
      <Listitem
        item={item}
        avatar={
          <EditableNumber
            suffix={metrica}
            title="Cambiar la cantidad"
            count={count}
            onUpdate={newCount => onUpdate({ ...item, count: newCount })}
          />
        }
        onSelect={null}
        showOptions={{
          horizontal: true,
          hideCode: false,
          hideTags: true,
          hideShow: true,
          hideEdit: true,
          hideImage: true,
          hideDelete: false,
          hideDescription: false,
          onDelete: onDelete ? i => onDelete(i) : null,
          deleteText: "¿Quitar producto?",
          deleteOkText: "quitar"
        }}
        extras={[
          <EditableNumber
            prefix="$"
            title="Cambiar el precio unitario"
            valueStyle={{
              color: "#1122bb",
              fontSize: "10px",
              fontWeight: "200"
            }}
            count={newPrice > 0 ? newPrice : price}
            onUpdate={newPrice =>
              onUpdate({ ...item, newPrice, newTotal: newPrice * count })
            }
          />,
          <Badge
            count={hasTax ? <Icon type={itax} style={{ color: icolor }} /> : 0}
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
              onUpdate={newTotal =>
                onUpdate({ ...item, newTotal, newPrice: newTotal / count })
              }
            />
          </Badge>
        ]}
      />
    );
  }
}

export default class extends React.Component {
  render() {
    const { onDelete, onUpdate, items = [], onAdd } = this.props;
    return (
      <div>
        {onAdd ? <Search onSelect={onAdd} /> : null}
        <List
          items={items}
          horizontal={true}
          emptyText="no tiene productos agregados"
          emptyIcon="heat-map"
          renderItem={item => (
            <Li
              item={item}
              onUpdate={onUpdate}
              onDelete={onDelete}
              showOptions={{}}
            />
          )}
        />
      </div>
    );
  }
}
