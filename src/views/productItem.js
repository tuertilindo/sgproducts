import React from "react";
import { Statistic } from "antd";
import Barcode from "react-barcode";

import { Tags, Colors, Listitem } from "../controls";

const generateActions = (item, showOptions) => {
  let arr = [];
  const { code = "", tags = [], colors = [], price = {} } = item;
  const { hidePrice, hideCode, hideTags, hideColors } = showOptions || {};
  if (!hidePrice) {
    arr.push(
      <Statistic
        value={price.final}
        precision={2}
        valueStyle={{ color: "#11aa11" }}
        prefix="$"
      />
    );
  }
  if (!hideCode && code.length > 0) {
    arr.push(
      <Barcode
        margin={0}
        fontSize={10}
        width={1}
        height={10}
        value={item.code}
      />
    );
  }
  if (!hideTags && tags.length > 0) {
    arr.push(<Tags tags={item.tags.length > 0 ? item.tags : ["sin tags"]} />);
  }
  if (!hideColors && colors.length > 0) {
    arr.push(
      <Colors colors={item.colors.length > 0 ? item.colors : ["#000"]} />
    );
  }

  return arr;
};
export default class extends React.Component {
  render() {
    const { item, showOptions = {}, onSelect } = this.props || [];

    return (
      <Listitem
        item={item}
        showOptions={showOptions}
        onSelect={onSelect}
        extras={generateActions(item, showOptions)}
      />
    );
  }
}
