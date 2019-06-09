import {InputNumber} from "antd"
import React from "react"
import Lay from "./layout"
export default ({key, data = {}, onChange, error}) => (
  <Lay key={data.value} icon={data.icon} title={data.title} error={error}>
    <InputNumber
      min={data.min}
      max={data.max}
      style={{
        width: "100%",
        height: "55px",
        fontSize: "32px",
        fontWeight: "bold"
      }}
      onKeyDown={d => d.keyCode === 13 && d.target.blur() && d.target.focus()}
      onBlur={d => onChange(d.target.value)}
      precision={data.precision || 2}
      defaultValue={data.value}
      parser={value => value.replace(data.prefix, "").replace(data.suffix, "")}
    />
  </Lay>
)
