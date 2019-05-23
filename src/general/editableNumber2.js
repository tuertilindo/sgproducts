import React from "react"
import {InputNumber, Icon, Button, Input, Alert} from "antd"
import {isEmpty} from "./util"
const validate = require("validate.js")
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCount: props.count || 0
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
      icon,
      size = 24,
      color = "#1122bb",
      constraints,
      resetToZero,
      buttonText,
      onOk,
      precision = 2,
      placeholder,
      title
    } = this.props
    const {newCount, resetKey, newText} = this.state
    const errors = constraints
      ? validate({value: newCount}, constraints, {fullMessages: false})
      : null
    return (
      <div>
        <span className="decimalbutton" style={{display: "inline-block"}}>
          <h4>
            <Icon type={icon || "info"} /> {title}
          </h4>
          <InputNumber
            key={resetKey}
            autoFocus
            min={min}
            style={{
              width: "150px",
              fontSize: size + "px",
              height: size * 1.5,
              fontWeight: "500px",
              color: color,
              margin: "5px",
              borderRadius: "0.3em"
            }}
            precision={precision}
            defaultValue={newCount}
            onChange={newCount => {
              if (!isNaN(newCount)) {
                if (onUpdate) Promise.resolve(onUpdate(newCount))
                this.setState({newCount})
              }
            }}
          />

          {onOk ? (
            <Button
              style={{verticalAlign: "text-bottom", color: color}}
              disabled={!isEmpty(errors)}
              icon={icon}
              onClick={() => {
                Promise.resolve(onOk({value: newCount, text: newText}))
                if (resetToZero)
                  this.setState({
                    newCount: 0,
                    resetKey: Math.random(),
                    newText: ""
                  })
              }}
            >
              {buttonText}
            </Button>
          ) : null}
          {placeholder ? (
            <Input
              key={resetKey + "t"}
              defaultValue={newText}
              onChange={e => this.setState({text: e.target.value})}
              maxLength={25}
              placeholder={placeholder}
            />
          ) : null}
        </span>
        {errors
          ? Object.keys(errors).map(k =>
              errors.hasOwnProperty(k) ? (
                <Alert
                  key={k}
                  type={"warning"}
                  message={errors[k]}
                  banner
                  closable
                />
              ) : null
            )
          : null}
      </div>
    )
  }
}
