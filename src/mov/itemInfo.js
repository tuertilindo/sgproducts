import React from "react";
import { Popover, List, Avatar, Badge, Icon } from "antd";
import { isEmpty } from "../general";
export default class extends React.Component {
  render() {
    const { item, action } = this.props || {};
    const { code = "", combo = {}, total = 0 } = item;
    const { subitems = [] } = combo || {};
    return (
      <Popover
        content={
          <div>
            {!isEmpty(combo) ? (
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
              <div>
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
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size="small"
                      style={{ color: "#556aFF", backgroundColor: "#ddddfd" }}
                    >
                      <Icon type="dollar" />
                    </Avatar>
                  }
                  title={total}
                />
              </div>
            )}
            {action}
          </div>
        }
        title={!isEmpty(combo) ? "Items del combo" : "Código"}
      >
        <Badge count={subitems.length} dot>
          <Icon type={!isEmpty(combo) ? "fork" : "barcode"} />
        </Badge>
      </Popover>
    );
  }
}
