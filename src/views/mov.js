import React from "react";
import { Statistic, Card } from "antd";
import { MovHeader, MovBody, MovFooter } from "../controls/";
import { transformMov } from "../util/movs";
import "../controls/list.css";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.mov || {};
  }

  render() {
    const {
      name,
      items = [],
      total = 0,
      subtotal = 0,
      descontado
    } = this.state;
    const { onClose } = this.props;
    return (
      <div>
        <Card
          title={<MovHeader onClose={onClose} mov={this.state} />}
          actions={[
            <Statistic
              value={subtotal}
              title="Subtotal"
              precision={2}
              valueStyle={{ color: "#1133bb", fontSize: "16px" }}
              prefix="$"
              suffix={null}
            />,
            <Statistic
              value={descontado}
              title="descuentos"
              precision={2}
              valueStyle={{ color: "#bb1133", fontSize: "16px" }}
              prefix="$"
              suffix={null}
            />,
            <Statistic
              value={total}
              title="Total"
              precision={2}
              valueStyle={{ color: "#11BB33" }}
              prefix="$"
              suffix={null}
            />
          ]}
        >
          <MovBody
            items={items}
            onDelete={item => {
              this.setState(
                transformMov({
                  ...this.state,
                  items: items.filter(i => i.id !== item.id)
                })
              );
            }}
            onAdd={prod => {
              const {
                count = 1,
                code,
                name = "desconocido",
                price = {},
                metrica = "u"
              } = prod;
              items.push({
                count,
                name,
                code,
                metrica,
                price: price.final || 0,
                total: parseFloat(count) * parseFloat(price)
              });
              this.setState(transformMov(this.state));
            }}
            onUpdate={item => {
              for (let i = 0; i < items.length; i++) {
                if (items[i].id === item.id) {
                  items[i] = item;
                  break;
                }
              }
              this.setState(transformMov(this.state));
            }}
          />
        </Card>
        <MovFooter
          onDelete={item => {
            for (let i = 0; i < items.length; i++) {
              if (item.codes.indexOf(items[i].code) >= 0) {
                items[i].newPrice = 0;
                items[i].newTotal = 0;
              }
            }
            this.setState(transformMov(this.state));
          }}
          mov={this.state}
        />
      </div>
    );
  }
}
