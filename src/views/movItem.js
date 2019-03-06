import React from "react";
import { Badge, Icon, Statistic } from "antd";
import Barcode from "react-barcode";
import { transformMov } from "../util/movs";

import { Tags, Colors, Listitem } from "../controls";

const generateActions = (item, showOptions) => {
  let arr = [];
  const { code = "", tags = [], items = [], total } = transformMov(item);

  const {
    hideCount,
    hideTarget,
    hideTags,
    hideCode,
    hideTotal,
    hideStatus,
    hideType
  } = showOptions || {};

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
  if (!hideCount) {
    arr.push(
      <Badge
        count={items.length}
        showZero
        style={{ backgroundColor: items.length > 0 ? "green" : "red" }}
      >
        <Icon type="bars" />
      </Badge>
    );
  }
  if (!hideTotal) {
    arr.push(
      <Statistic
        value={total}
        precision={2}
        valueStyle={{ color: "#11aa11" }}
        prefix="$"
      />
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
        avatar={<Badge status="success" text="Success" />}
        showOptions={{ ...showOptions, hideImage: true }}
        onSelect={onSelect}
        extras={generateActions(item, showOptions)}
      />
    );
  }
}
