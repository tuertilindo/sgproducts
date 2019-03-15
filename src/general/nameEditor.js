import React from "react"
import { Input, Card, Alert, Icon } from "antd"
const { TextArea } = Input
const showError = (error, key) => {
  if (error && key && error[key]) {
    return <Alert type="error" message={error[key]} banner />
  }
}

export default class extends React.Component {
  render() {
    const { onChange, name, description, code, error } = this.props
    return (
      <Card>
        <h4>
          <Icon type="tag" /> Nombre
        </h4>
        <Input
          defaultValue={name}
          onChange={e => onChange({ name: e.target.value })}
          maxLength={25}
          placeholder="Nómbre"
          allowClear
        />
        {showError(error, "name")}

        <h4>
          <Icon type="edit" /> Descripción
        </h4>
        <TextArea
          placeholder="Descripción y datos extras"
          autosize={{ minRows: 2, maxRows: 6 }}
          onChange={e => onChange({ description: e.target.value })}
          defaultValue={description}
        />
        {showError(error, "description")}
        <h4>
          <Icon type="barcode" /> Código o serial
        </h4>
        <Input
          defaultValue={code}
          onChange={e => onChange({ code: e.target.value.toUpperCase() })}
          maxLength={25}
          placeholder="Serial o codigo de barras"
          allowClear
        />
        {showError(error, "code")}
      </Card>
    )
  }
}
