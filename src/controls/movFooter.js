import React from "react";
import { Badge, Card, Icon, Statistic, Avatar, Tooltip } from "antd";
import Listitem from "./listItem";
import List from "./list";
class Li extends React.Component {
  render() {
    const { item, onDelete } = this.props || [];
    const { price, label, percent, type } = item;
    let itax = price > 0 ? "rise" : "fall";
    let icolor = price > 0 ? "#15b31d" : "#f5222d";
    let iback = price > 0 ? "#dffddf" : "#fde3cf";
    if (type === "iva") {
      icolor = "blue";
      iback = "#ddddff";
      itax = "safety-certificate";
    }
    return (
      <Listitem
        item={item}
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
          deleteText: "¿Quitar " + label + "?",
          deleteOkText: "quitar"
        }}
        avatar={
          <Badge count={<Icon type={itax} style={{ color: icolor }} />}>
            <Tooltip title={label + " " + percent}>
              <Avatar style={{ color: icolor, backgroundColor: iback }}>
                {percent}
              </Avatar>
            </Tooltip>
            ,
          </Badge>
        }
        extras={[
          <Statistic
            value={price}
            precision={2}
            valueStyle={{
              color: icolor,
              fontSize: "14px",
              fontWeight: "200"
            }}
            prefix="$"
          />
        ]}
      />
    );
  }
}

export default class extends React.Component {
  render() {
    const { mov = {}, onDelete } = this.props;
    const { descuentos = [] } = mov;
    return (
      <Card title="Descuentos, intereses e impuestos:">
        <List
          items={descuentos}
          emptyText="no tiene descuentos ni intereses"
          emptyIcon="thunderbolt"
          horizontal={true}
          renderItem={item => <Li item={item} onDelete={onDelete} />}
        />
      </Card>
    );
  }
}
