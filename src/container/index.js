import React from "react"
import {Tabs, BackTop} from "antd"
import Prodsview from "../product/selector"
import Prodedit from "../product"
import Clientview from "../client/selector"
import ClientEdit from "../client"
import Movsview from "../mov/selector"
import Movview from "../mov"
import Config from "./config"
const TabPane = Tabs.TabPane

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movSelected: null,
      productSelected: null,
      clientSelected: null
    }
  }
  render() {
    const {movSelected, productSelected, clientSelected} = this.state
    return (
      <div style={{maxWidth: "640px", display: "block", margin: "auto"}}>
        <BackTop style={{right: 5}} visibilityHeight={300} />

        <Tabs defaultActiveKey="4">
          <TabPane tab="Movimientos" key="1">
            {movSelected ? (
              <Movview
                mov={movSelected}
                onClose={() => this.setState({movSelected: null})}
              />
            ) : (
              <div>
                <Movsview onSelect={m => this.setState({movSelected: m})} />
              </div>
            )}
          </TabPane>
          <TabPane tab="Productos" key="2">
            {productSelected ? (
              <Prodedit
                onCancel={() => this.setState({productSelected: null})}
                product={productSelected}
              />
            ) : (
              <Prodsview
                onSelect={item => this.setState({productSelected: item})}
              />
            )}
          </TabPane>
          <TabPane tab="Clientes" key="3">
            {clientSelected ? (
              <ClientEdit
                client={clientSelected}
                onCancel={() => this.setState({clientSelected: null})}
              />
            ) : (
              <Clientview
                horizontal
                showOptions={{
                  horizontal: true
                }}
                onSelect={item => this.setState({clientSelected: item})}
              />
            )}
          </TabPane>
          <TabPane tab="Configuracion" key="4">
            <Config />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
