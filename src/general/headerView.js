import React from "react"
import {Avatar, Card, Button, Tooltip, Tag} from "antd"
import {getThumbnail} from "./util"
const {Meta} = Card
export default class extends React.Component {
  render() {
    const {
      data = {},
      onClose,
      closeText = "cerrar",
      closeIcon = "close",
      avatar,
      hideAvatar,
      onEdit,
      editText = "editar",
      editIcon = "edit",
      extra,
      tag,
      tagStyle
    } = this.props
    const {name, description} = data || {}
    let navatar = avatar
    if (!navatar && !hideAvatar) {
      navatar = <Avatar src={getThumbnail(data)} />
    }
    return (
      <div>
        {onClose ? (
          <Tooltip title={closeText} mouseEnterDelay={1} placement="leftTop">
            <Button
              style={{float: "right"}}
              size="small"
              icon={closeIcon}
              shape="circle"
              onClick={() => onClose()}
            />
          </Tooltip>
        ) : null}
        {onEdit ? (
          <Tooltip title={editText} mouseEnterDelay={1} placement="leftTop">
            <Button
              style={{float: "right"}}
              size="small"
              icon={editIcon}
              shape="circle"
              onClick={() => onEdit(data)}
            />
          </Tooltip>
        ) : null}
        {tag ? (
          <Tag
            style={{
              float: "right",
              ...tagStyle
            }}
          >
            {tag}
          </Tag>
        ) : null}
        {extra ? (
          <div
            style={{
              float: "right",
              fontSize: "0.7em",
              fontWeight: "100",
              paddingRight: "3px"
            }}
          >
            {extra}
          </div>
        ) : null}
        <Meta avatar={navatar} title={name} description={description} />
      </div>
    )
  }
}
