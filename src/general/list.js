import React from "react"
import { Avatar, Icon, List } from "antd"

export default class extends React.Component {
  render() {
    const {
      onSelect,
      items,
      horizontal,
      emptyText,
      emptyIcon,
      typeStyler,
      extraList = [],
      avatar
    } = this.props

    return (
      <List
        locale={{
          emptyText: (
            <div style={{ textAlign: "center" }}>
              <Icon type={emptyIcon || "robot"} style={{ fontSize: 40 }} />
              <p>{emptyText || "No hay items"}</p>
            </div>
          )
        }}
        dataSource={items}
        horizontal={horizontal}
        renderItem={item => {
          const { style, icon } = typeStyler
            ? typeStyler(item.type)
            : { style: {}, icon: "smile" }
          return (
            <List.Item
              style={onSelect ? { cursor: "pointer" } : null}
              onClick={() => {
                if (onSelect) {
                  onSelect(item)
                }
              }}
              actions={extraList.map(extra => extra(item))}
            >
              <List.Item.Meta
                avatar={
                  avatar ? (
                    avatar(item)
                  ) : (
                    <Avatar style={style}>
                      <Icon type={icon} />
                    </Avatar>
                  )
                }
                title={item.name || "desconocido"}
                description={item.description}
              />
            </List.Item>
          )
        }}
      />
    )
  }
}
