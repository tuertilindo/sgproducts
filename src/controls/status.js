import React from "react";
import { Select } from "antd";

const Option = Select.Option;

export default class StatusSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }

  render() {
    const { onChange, editable, defaultValue } = this.props;
    return (
      <div>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={onChange}
          disabled={!editable}
          defaultValue={defaultValue}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
    );
  }
}
