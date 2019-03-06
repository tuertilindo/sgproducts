import React from "react";
import ListItem from "./productItem";
import { List } from "../controls/";
import { searchProduct } from "../util/product";
export default class extends React.Component {
  render() {
    const {
      showOptions = {},
      onSelect,
      onEdit,
      onDelete,
      onView,
      products,
      horizontal,
      textToSearch
    } = this.props;
    return (
      <List
        items={products}
        textToSearch={textToSearch}
        horizontal={horizontal}
        search={searchProduct}
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
