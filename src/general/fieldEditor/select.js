import {Select} from "antd"
import React from "react"
import Lay from "./layout"
export default ({key, data = {}, onChange, error}) => (
  <Lay key={key} icon={data.icon} title={data.title} error={error}>
    <Select
      defaultValue={data.value || data.values[0]}
      style={{width: 150}}
      onChange={onChange}
    >
      {data.values.map(v => (
        <Select.Option key={v} value={v}>
          {v}
        </Select.Option>
      ))}
    </Select>
  </Lay>
)
