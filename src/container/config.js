import React from "react"
import {Switch, PageHeader, Select, Spin} from "antd"
import {showError, saveConfig, initConfig, bool} from "../general"
import ProdFeed from "../product/feed"
const Option = Select.Option

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  save(cfg) {
    saveConfig(cfg)
    this.setState({...cfg})
  }
  componentDidMount() {
    Promise.resolve(this.setState({loading: true})).then(() =>
      initConfig()
        .then(l => this.setState({...l, loading: false}))
        .catch(showError)
    )
  }
  render() {
    const {ventaTarget, autoPagar, loading} = this.state
    return (
      <Spin spinning={loading} tip="Obteniendo configuración..." delay={200}>
        <PageHeader
          title="Cliente"
          subTitle="Al vender elije automaticamente el cliente"
          extra={[
            <Select
              defaultValue={ventaTarget || "ninguno"}
              style={{width: 130}}
              onChange={v => this.save({ventaTarget: v})}
              key={ventaTarget}
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
              key={autoPagar + "asd"}
              defaultChecked={bool(autoPagar)}
              onChange={k => this.save({autoPagar: k})}
            />
          ]}
        />
        <ProdFeed />
      </Spin>
    )
  }
}
