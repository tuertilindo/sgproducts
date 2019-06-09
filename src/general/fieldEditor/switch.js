import {Switch} from "antd"
import React from "react"
import Lay from "./layout"
export default ({key, data = {}, onChange, error}) => (
  <Lay key={key} icon={data.icon} title={data.title} error={error}>
    <Switch
      key={key}
      checkedChildren={data.on}
      unCheckedChildren={data.off}
      defaultChecked={data.value}
      onChange={onChange}
    />
    {data.description}
  </Lay>
)
