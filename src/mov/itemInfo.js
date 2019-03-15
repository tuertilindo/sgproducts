import React from "react"
import { Popover, List, Avatar, Badge, Icon } from "antd"
export default class extends React.Component {
  render() {
    const { item, action } = this.props || {}
    const { code = "", combo = {} } = item
    const { subitems = [] } = combo || {}
    return (
      <Popover
        content={
          <div>
            {combo ? (
              <List
                itemLayout="horizontal"
                dataSource={subitems}
                renderItem={item => (
                  <List.Item style={{ padding: 2 }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size="small"
                          style={{
                            color: "#556aFF",
                            backgroundColor: "#ddddfd"
                          }}
                        >
                          {item.count}
                        </Avatar>
                      }
                      title={item.name}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="small"
                    style={{ color: "#556aFF", backgroundColor: "#ddddfd" }}
                  >
                    <Icon type="barcode" />
                  </Avatar>
                }
                title={code}
              />
            )}
            {action}
          </div>
        }
        title={combo ? "Items del combo" : "Código"}
      >
        <Badge count={subitems.length} dot>
          <Icon type={combo ? "fork" : "barcode"} />
        </Badge>
      </Popover>
    )
  }
}
