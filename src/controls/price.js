import React from "react";
import { InputNumber, Statistic, Button, Card } from "antd";

const confirmButton = action => (
  <Button
    icon="check"
    style={{ color: "green" }}
    shape="circle"
    size="small"
    ghost
    onClick={action}
  />
);

const editButton = (action, color) => (
  <Button
    style={{ color: color || "green" }}
    icon="edit"
    shape="circle"
    size="small"
    ghost
    onClick={action}
  />
);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.price || {};
  }
  changeCost(price, cost) {
    const { gain = 0 } = price;
    return { ...price, cost, final: cost * (1 + gain / 100) };
  }
  changeGain(price, gain) {
    const { cost = 0 } = price;
    return { ...price, gain, final: cost * (1 + gain / 100) };
  }
  changePrice(price, final) {
    const { cost = 0, gain = 0 } = price;
    const calcFinal = cost * (1 + gain / 100);
    if (cost > 0 && gain > 0 && final >= calcFinal) {
      return { ...price, gain: ((final - cost) * 100) / cost, final };
    } else if (cost > 0 && gain === 0 && final >= cost) {
      return { ...price, cost: final, final };
    } else if (cost > 0 && gain === 0 && final < cost) {
      return { ...price, final: cost };
    } else if (cost > 0 && gain > 0 && final < calcFinal) {
      return { ...price, final: calcFinal };
    }
    return { ...price, gain: 0, final, cost: final };
  }
  doUpdate(price) {
    const newPrice = { ...this.state, ...price };

    const { onPriceUpdate } = this.props;
    delete newPrice.editing;
    if (onPriceUpdate) onPriceUpdate(newPrice);
    this.setState(newPrice);
  }

  render() {
    const {
      final = 0,
      cost = 0,
      dolar = 0,
      gain = 0,
      iva = 21,
      editing
    } = this.state;
    let cotizacion = 0;
    if (dolar > 0) {
      const d = JSON.parse(localStorage.getItem("dolar")) || {};
      cotizacion = d.value || 0;
    }
    return (
      <Card>
        <Statistic
          value={cost}
          title="Costo"
          precision={2}
          valueStyle={{ color: "#1111aa" }}
          prefix="$"
          suffix={
            editing === "cost" ? (
              <div>
                <InputNumber
                  defaultValue={cost}
                  precision={2}
                  min={0}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={v => this.doUpdate(this.changeCost(this.state, v))}
                />{" "}
                {confirmButton(() => this.setState({ editing: "" }))}
              </div>
            ) : (
              editButton(() => this.setState({ editing: "cost" }), "#1111aa")
            )
          }
        />

        <Statistic
          value={gain}
          title="Ganancia"
          precision={2}
          valueStyle={{ color: "#11aaaa" }}
          prefix="%"
          suffix={
            editing === "gain" ? (
              <div>
                <InputNumber
                  defaultValue={gain}
                  min={0}
                  precision={2}
                  formatter={value => `${value}%`}
                  parser={value => value.replace("%", "")}
                  onChange={v => this.doUpdate(this.changeGain(this.state, v))}
                />{" "}
                {confirmButton(() => this.setState({ editing: "" }))}
              </div>
            ) : (
              editButton(() => this.setState({ editing: "gain" }), "#11aaaa")
            )
          }
        />
        <Statistic
          value={final}
          title="Precio final"
          min={cost}
          precision={2}
          valueStyle={{ color: "#11aa11" }}
          prefix="%"
          suffix={
            editing === "final" ? (
              <div>
                <InputNumber
                  defaultValue={final}
                  precision={2}
                  min={cost}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={v => this.doUpdate(this.changePrice(this.state, v))}
                />{" "}
                {confirmButton(() => this.setState({ editing: "" }))}
              </div>
            ) : (
              editButton(() => this.setState({ editing: "final" }), "#11aa11")
            )
          }
        />
        <Statistic
          value={dolar}
          title="Costo dolar"
          precision={2}
          valueStyle={{ color: "#338833" }}
          prefix="%"
          suffix={
            editing === "dolar" ? (
              <div>
                <InputNumber
                  defaultValue={dolar}
                  precision={2}
                  min={cost}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={v =>
                    this.doUpdate({
                      dolar: v
                    })
                  }
                />
                {confirmButton(() => this.setState({ editing: "" }))}
              </div>
            ) : (
              <div>
                {editButton(
                  () => this.setState({ editing: "dolar" }),
                  "#338833"
                )}
                {cotizacion > 0 ? (
                  <Button
                    style={{ color: "#aaaa11" }}
                    icon="dollar"
                    shape="circle"
                    size="small"
                    ghost
                    onClick={() =>
                      this.doUpdate(
                        this.changeCost(this.state, cotizacion * dolar)
                      )
                    }
                  />
                ) : null}
              </div>
            )
          }
        />
      </Card>
    );
  }
}
