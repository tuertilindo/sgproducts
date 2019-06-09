import {Icon, Alert} from "antd"
import React from "react"
export default ({key, children, error, icon, title}) => (
  <div key={key}>
    <h4>
      <Icon type={icon} /> {title}
    </h4>
    {children}
    {error ? <Alert type="error" message={error[0]} banner /> : null}
  </div>
)
