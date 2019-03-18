import React from "react"
import {Input, Card, Alert, Icon, Select, Switch} from "antd"

const createField = (key, data = {}, onChange, error) => {
  const myOnChange = e => {
    let obj = {}
    obj[key] = e
    onChange(obj)
  }
  const Comp = data.multiline
    ? Input.TextArea
    : data.password
    ? Input.Password
    : Input
  if (data.on) {
    return (
      <Switch
        key={key}
        checkedChildren={data.on}
        unCheckedChildren={data.off}
        defaultChecked={data.value}
        onChange={myOnChange}
      />
    )
  }
  return (
    <div>
      <h4>
        <Icon type={data.icon} /> {data.title}
      </h4>
      {data.values ? (
        <Select
          key={key}
          defaultValue={data.value || data.values[0]}
          style={{width: 150}}
          onChange={myOnChange}
        >
          {data.values.map(v => (
            <Select.Option key={v} value={v}>
              {v}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <Comp
          key={key}
          defaultValue={data.value}
          onChange={e => myOnChange(e.target.value)}
          maxLength={25}
          placeholder={data.placeholder}
          allowClear={data.multiline ? null : true}
        />
      )}
      {error ? <Alert type="error" message={error[0]} banner /> : null}
    </div>
  )
}

export default class extends React.Component {
  render() {
    const {onChange, fields = {}, errors = {}, title} = this.props
    return (
      <Card title={title}>
        {Object.keys(fields).map(f =>
          createField(f, fields[f], onChange, errors[f])
        )}
      </Card>
    )
  }
}
