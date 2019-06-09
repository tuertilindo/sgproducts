import {Input} from "antd"
import React from "react"
import Lay from "./layout"
export default ({key, data = {}, onChange, error}) => (
  <Lay key={key} icon={data.icon} title={data.title} error={error}>
    <Input.TextArea
      defaultValue={data.value}
      onChange={e => onChange(e.target.value)}
      maxLength={data.max}
      placeholder={data.placeholder}
    />
  </Lay>
)
