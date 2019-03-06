import React from "react";
import ListItem from "./movItem";
import { List } from "../controls/";
import { searchMovs } from "../util/movs";
export default class extends React.Component {
  render() {
    const {
      showOptions = {},
      onSelect,
      onEdit,
      onDelete,
      onView,
      movs,
      horizontal
    } = this.props;
    return (
      <List
        items={movs}
        horizontal={horizontal}
        search={searchMovs}
        renderItem={item => (
          <ListItem
            item={item}
            onSelect={onSelect}
            showOptions={{
              ...showOptions,
              onEdit: () => onEdit(item),
              onView: () => onView(item),
              onDelete: () => onDelete(item)
            }}
          />
        )}
      />
    );
  }
}
