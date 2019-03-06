import React from "react";
import { InputNumber, Statistic, Button } from "antd";

export default class extends React.Component {
  state = {
    dolar: JSON.parse(localStorage.getItem("dolar")) || {},
    editing: false
  };
  setDolar(value) {
    if (value) {
      const dolar = {
        value,
        updatedAt: new Date()
      };
      localStorage.setItem("dolar", JSON.stringify(dolar));
      this.setState({ dolar });
    }
  }

  render() {
    const { dolar, editing } = this.state || {};
    const { value, updateAt } = dolar;
    const { editable } = this.props;

    return (
      <div>
        <Statistic
          value={value}
          title="Cotización del dolar"
          precision={2}
          valueStyle={{ color: "#33aa33" }}
          prefix="U$S"
          suffix={
            editable ? (
              editing ? (
                <div>
                  <InputNumber
                    defaultValue={value}
                    precision={2}
                    min={0}
                    formatter={value =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                    onChange={v => this.setDolar(v)}
                  />
                  <Button
                    icon="check"
                    style={{ color: "green" }}
                    shape="circle"
                    size="small"
                    ghost
                    onClick={() => this.setState({ editing: false })}
                  />
                </div>
              ) : (
                <Button
                  type="primary"
                  icon="edit"
                  shape="circle"
                  size="small"
                  ghost
                  onClick={() => this.setState({ editing: "cost" })}
                />
              )
            ) : null
          }
        />
      </div>
    );
  }
}
