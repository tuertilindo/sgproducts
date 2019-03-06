import React from "react";

import { Listitem } from "../controls";


export default class extends React.Component {
  render() {
    const { item, showOptions = {}, onSelect } = this.props || [];
    return (
      <Listitem
        item={item}
        showOptions={showOptions}
        onSelect={onSelect}
      />
    );
  }
}
