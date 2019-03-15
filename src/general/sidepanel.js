import React from "react"
import { Drawer } from "antd"
import "./sidepanel.css"
export default class extends React.Component {
  render() {
    const {
      title,
      placement,
      children,
      button,
      style,
      visible,
      onClose,
      ...other
    } = this.props
    return (
      <Drawer
        title={title || "Titulo"}
        width="90%"
        style={{ maxWidth: "300px" }}
        closable={true}
        onClose={onClose}
        visible={visible}
        placement={placement}
      >
        <div>
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              ...other
            })
          )}
        </div>
      </Drawer>
    )
  }
}
