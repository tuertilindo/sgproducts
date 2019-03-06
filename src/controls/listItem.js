import React from "react";
import { List, Avatar, Button, Popconfirm, Icon } from "antd";
import { getThumbnail } from "../util/general";
const generateActions = (item, showOptions) => {
  let arr = [];
  const {
    onEdit,
    onView,
    onDelete,
    hideEdit,
    hideShow,
    hideDelete,
    deleteText,
    deleteOkText
  } = showOptions || {};
  if (!hideShow && onView) {
    arr.push(<Button size="small" icon="eye" onClick={() => onView(item)} />);
  }
  if (!hideEdit && onEdit) {
    arr.push(<Button size="small" icon="edit" onClick={() => onEdit(item)} />);
  }
  if (!hideDelete && onDelete) {
    arr.push(
      <Popconfirm
        title={deleteText || "¿Está seguro que desea eliminar?"}
        onConfirm={() => Promise.resolve(onDelete(item))}
        icon={<Icon type="delete" style={{ color: "red" }} />}
        onCancel={null}
        okText={deleteOkText || "eliminar"}
        cancelText="No"
        okType="danger"
      >
        <Button size="small" icon="delete" type="danger" />
      </Popconfirm>
    );
  }

  return arr;
};
export default class extends React.Component {
  render() {
    const { item, showOptions = {}, onSelect, extras = [], avatar = null } =
      this.props || [];
    return (
      <List.Item
        style={onSelect ? { cursor: "pointer" } : null}
        onClick={() => {
          if (onSelect) {
            onSelect(item);
          }
        }}
        actions={[...extras, ...generateActions(item, showOptions)]}
      >
        <List.Item.Meta
          avatar={
            !showOptions.hideImage ? (
              <Avatar src={getThumbnail(item)} />
            ) : (
              avatar
            )
          }
          title={!showOptions.hideName ? item.name : null}
          description={!showOptions.hideDescription ? item.description : null}
        />
      </List.Item>
    );
  }
}
