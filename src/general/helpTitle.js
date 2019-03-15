import React from "react"
import { Popover, Button } from "antd"

export default class extends React.Component {
  render() {
    const { title, children } = this.props

    return (
      <div>
        <h4 style={{ display: "inline" }}>{title}</h4>
        <Popover content={children} title={title} trigger="click">
          <Button
            icon="question"
            shape="circle"
            size="small"
            style={{ margin: "5px" }}
          />
        </Popover>
      </div>
    )
  }
}
