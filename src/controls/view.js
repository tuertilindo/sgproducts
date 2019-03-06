import React from "react";
import { Avatar, Card, Button } from "antd";
import { getThumbnail } from "../util/general";
const { Meta } = Card;
export default class extends React.Component {
  render() {
    const { data = {}, onClose, avatar, hideAvatar } = this.props;
    const { name, description, images, imageIndex } = data;
    let navatar = avatar;
    if (!navatar && !hideAvatar) {
      navatar = <Avatar src={getThumbnail(data)} />;
    }
    return (
      <div>
        {onClose ? (
          <Button
            style={{ float: "right" }}
            size="small"
            icon="close"
            shape="circle"
            onClick={() => onClose()}
          />
        ) : null}
        <Meta avatar={navatar} title={name} description={description} />
      </div>
    );
  }
}
