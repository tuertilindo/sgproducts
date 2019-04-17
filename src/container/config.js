import React from "react"
import {Switch, PageHeader, Select} from "antd"
import {getConfig, saveConfig} from "../general"
import ProdFeed from "../product/feed"
const Option = Select.Option

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = getConfig()
  }
  save(cfg) {
    saveConfig(cfg)
    this.setState({...cfg})
  }
  render() {
    const {ventaTarget, autoPagar} = this.state
    return (
      <div>
        <PageHeader
          title="Cliente"
          subTitle="Al vender elije automaticamente el cliente"
          extra={[
            <Select
              defaultValue={ventaTarget || "ninguno"}
              style={{width: 130}}
              onChange={v => this.save({ventaTarget: v})}
            >
              <Option value="ninguno">Ninguno</Option>
              <Option value="ultimo">Ultimo usado</Option>
              <Option value="consumidor">Consumidor Final</Option>
            </Select>
          ]}
        />
        <PageHeader
          title="Pagos"
          subTitle="Autopagar con efectivo todas las ventas"
          extra={[
            <Switch
              defaultChecked={autoPagar}
              onChange={k => this.save({autoPagar: k})}
            />
          ]}
        />
        <ProdFeed />
      </div>
    )
  }
}
