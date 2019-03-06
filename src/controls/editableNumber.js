import React from "react";
import { Statistic, Popover, InputNumber, Button, Popconfirm } from "antd";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null
    };
  }
  render() {
    const {
      onUpdate,
      count = 0,
      min = 0.01,
      prefix = "",
      suffix = "",
      title = "Editar número",
      valueStyle,
      precision = 2
    } = this.props || [];
    const { editing, newCount } = this.state;
    const vstyle = {
      ...{
        color: "#1122bb",
        fontSize: "12px",
        fontWeight: "200"
      },
      ...valueStyle
    };
    return (
      <div>
        {onUpdate ? (
          <Popover
            content={
              <div>
                <InputNumber
                  autoFocus
                  min={min}
                  style={{ width: "110px" }}
                  precision={precision}
                  defaultValue={count}
                  formatter={value => `${prefix}${value}${suffix}`}
                  parser={value =>
                    value.replace(prefix, "").replace(suffix, "")
                  }
                  onChange={newCount => this.setState({ newCount })}
                />
                <Button
                  onClick={() => {
                    if (newCount > 0 && newCount !== parseFloat(count)) {
                      Promise.resolve(onUpdate(newCount));
                    }

                    this.setState({ editing: false });
                  }}
                  shape="circle"
                  size="small"
                  icon="check"
                  ghost
                  style={{ color: "green", float: "right" }}
                />
              </div>
            }
            title={
              <div>
                {title}
                <Button
                  onClick={() => this.setState({ editing: false })}
                  shape="circle"
                  size="small"
                  icon="close"
                  ghost
                  style={{ float: "right", color: "gray" }}
                />
              </div>
            }
            trigger="click"
            visible={editing}
            onVisibleChange={editing => this.setState({ editing })}
          >
            <Button
              size="small"
              onClick={() => this.setState({ editing: true })}
              ghost
            >
              <Statistic
                value={count}
                precision={precision}
                valueStyle={vstyle}
                suffix={suffix}
                prefix={prefix}
              />{" "}
            </Button>
          </Popover>
        ) : (
          <Statistic
            value={count}
            precision={precision}
            valueStyle={vstyle}
            suffix={suffix}
            prefix={prefix}
          />
        )}
      </div>
    );
  }
}
