import React from "react";
import ListItem from "./clientItem";
import { List } from "../controls/";
import { searchClients } from "../util/clients";
export default class extends React.Component {
  render() {
    const {
      showOptions = {},
      onSelect,
      onEdit,
      onDelete,
      onView,
      clients,
      horizontal
    } = this.props;
    return (
      <List
        items={clients}
        horizontal={horizontal}
        search={searchClients}
        renderItem={item => (
          <ListItem
            item={item}
            onSelect={onSelect}
            showOptions={{
              ...showOptions,
              onEdit: onEdit ? () => onEdit(item) : null,
              onView: onView ? () => onView(item) : null,
              onDelete: onDelete ? () => onDelete(item) : null
            }}
          />
        )}
      />
    );
  }
}
