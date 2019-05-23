import React from "react"
import {Statistic, Popover, InputNumber, Icon, Tooltip} from "antd"
import "./decimal.css"
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCount: props.count
    }
  }

  componentDidUpdate(prevProps) {
    const {count} = this.props
    if (count !== prevProps.count) {
      this.setState({newCount: count})
    }
  }
  render() {
    const {
      onUpdate,
      min = 0.0,
      prefix = "",
      suffix = "",
      title = "Editar número",
      size,
      color = "#1122bb",
      valueStyle,
      name,
      precision = 2
    } = this.props || []
    const {newCount} = this.state
    const vstyle = {
      ...{
        color,
        fontSize: (size || "12") + "px",
        fontWeight: "200"
      },
      ...valueStyle
    }
    return (
      <span className="decimalbutton" style={{display: "inline-block"}}>
        <div style={{margin: "auto"}}>{name}</div>
        <div style={{display: "inline-block"}}>
          {onUpdate ? (
            <Tooltip title={title} mouseEnterDelay={1} placement="left">
              <Popover
                content={
                  <InputNumber
                    autoFocus
                    min={min}
                    style={{width: "130px"}}
                    precision={precision}
                    defaultValue={newCount}
                    formatter={value => `${value}`}
                    parser={value =>
                      value.replace(prefix, "").replace(suffix, "")
                    }
                    onChange={newCount => {
                      if (!isNaN(newCount)) {
                        Promise.resolve(onUpdate(newCount))
                        this.setState({newCount})
                      }
                    }}
                  />
                }
                trigger="click"
                title={
                  <span>
                    <Icon type="dollar" style={{color: color}} /> {title}
                  </span>
                }
              >
                <a>
                  <Statistic
                    value={newCount}
                    precision={precision}
                    valueStyle={vstyle}
                    suffix={suffix}
                    prefix={prefix}
                  />
                </a>
              </Popover>
            </Tooltip>
          ) : (
            <Statistic
              value={newCount}
              precision={precision}
              valueStyle={vstyle}
              suffix={suffix}
              prefix={prefix}
            />
          )}
        </div>
      </span>
    )
  }
}
