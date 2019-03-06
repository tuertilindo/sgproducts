import React from "react";
import View from "./view";
import { Badge, Card, Icon, Statistic, Avatar, Tooltip } from "antd";
export default class extends React.Component {
  render() {
    const { mov = {}, onClose } = this.props;
    const { target = {} } = mov;
    return (
      <div>
        <View
          data={target}
          onClose={onClose}
          avatar={<Icon type="user" style={{ color: "blue" }} />}
        />
      </div>
    );
  }
}
