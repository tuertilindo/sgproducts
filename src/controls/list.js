import React from "react";
import { List, Button, ConfigProvider, Icon } from "antd";
import Search from "./search";
import "./list.css";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {}
    };
  }
  render() {
    const { filter, showAll } = this.state;
    const {
      items,
      search,
      renderItem,
      horizontal,
      emptyIcon,
      emptyText,
      textToSearch
    } = this.props;
    const founded = search ? search(items, filter) : items || [];
    return (
      <div>
        {search ? (
          <Search
            textToSearch={textToSearch}
            onSearch={filter => {
              this.setState({ filter, showAll: false });
            }}
            count={founded.length}
          />
        ) : null}
        <ConfigProvider
          renderEmpty={() => (
            <div style={{ textAlign: "center" }}>
              <Icon type={emptyIcon || "robot"} style={{ fontSize: 40 }} />
              <p>{emptyText || "la lista esta vacia"}</p>
            </div>
          )}
        >
          <List
            itemLayout={horizontal ? "horizontal" : "vertical"}
            dataSource={showAll ? founded : founded.slice(0, 10)}
            renderItem={renderItem}
          />
        </ConfigProvider>
        {founded.length > 10 && search ? (
          <div
            style={{
              width: "20%",
              margin: "0 auto"
            }}
          >
            {" "}
            <Button
              icon="bars"
              style={{ marginLeft: "auto" }}
              onClick={() => this.setState({ showAll: true })}
            >
              Ver todo
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}
