import React from "react"
import SidePanel from "./sidepanel"
import {Button, Avatar, Icon, List, Tooltip} from "antd"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSide: false
    }
  }

  render() {
    const {children, icon, title, description, placement, avatar} = this.props

    const {showSide} = this.state

    return (
      <div>
        <Tooltip title={title} mouseEnterDelay={1} placement="left">
          <Button
            size="small"
            shape="circle"
            icon={icon || "edit"}
            onClick={() => this.setState({showSide: true})}
          />
        </Tooltip>

        <SidePanel
          placement={placement}
          title={
            <List.Item.Meta
              avatar={
                avatar ? (
                  avatar
                ) : (
                  <Avatar>
                    <Icon type={icon || "edit"} />
                  </Avatar>
                )
              }
              title={title}
              description={description}
            />
          }
          onClose={() => this.setState({showSide: false})}
          visible={showSide}
        >
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              onClose: () => this.setState({showSide: false})
            })
          )}
        </SidePanel>
      </div>
    )
  }
}
