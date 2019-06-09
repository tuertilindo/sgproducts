import React from "react"
import {Card} from "antd"
import Switch from "./switch"
import Select from "./select"
import Numeric from "./numeric"
import Area from "./area"
import Password from "./password"
import Text from "./text"

const createField = (key, data = {}, onChange, error) => {
  const myOnChange = e => {
    let obj = {}
    obj[key] = e
    onChange(obj)
  }

  if (data.on) {
    return <Switch key={key} data={data} onChange={myOnChange} />
  }
  if (data.values) {
    return <Select key={key} data={data} onChange={myOnChange} />
  }
  if (data.numeric) {
    return <Numeric key={key} data={data} onChange={myOnChange} />
  }
  if (data.multiline) {
    return <Area key={key} data={data} onChange={myOnChange} />
  }
  if (data.password) {
    return <Password key={key} data={data} onChange={myOnChange} />
  }
  return <Text key={key} data={data} onChange={myOnChange} />
}

export default class extends React.Component {
  render() {
    const {onChange, fields = {}, errors = {}, title} = this.props
    return (
      <Card title={title}>
        {Object.keys(fields).map(f =>
          !fields[f].hidden
            ? createField(f, fields[f], onChange, errors[f])
            : null
        )}
      </Card>
    )
  }
}
