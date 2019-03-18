import React from "react"
import {Tabs, BackTop} from "antd"
import Prodsview from "../product/view"
import Prodedit from "../product"
import Clientview from "../client/view"
import ClientEdit from "../client"
import UserView from "../user/view"
import UserEdit from "../user"
import Movsview from "../mov/view"
import Movview from "../mov"
import Config from "./config"
import Login from "../user/login"
import {getEntity} from "../general"
const TabPane = Tabs.TabPane

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movSelected: null,
      productSelected: null,
      clientSelected: null,
      userSelected: null,
      userLoged: null
    }
  }
  componentDidMount() {
    getEntity(0, "logins").then(logged =>
      this.setState({userLoged: logged}).catch(e => console.log(e))
    )
  }
  render() {
    const {
      movSelected,
      productSelected,
      clientSelected,
      userSelected,
      userLoged
    } = this.state
    if (!userLoged) {
      return <Login onLogin={u => this.setState({userLoged: u})} />
    }
    return (
      <div style={{maxWidth: "640px", display: "block", margin: "auto"}}>
        <BackTop style={{right: 5}} visibilityHeight={300} />

        <Tabs defaultActiveKey="1">
          <TabPane tab="Movimientos" key="1">
            {movSelected ? (
              <Movview
                mov={movSelected}
                onClose={() => this.setState({movSelected: null})}
              />
            ) : (
              <div>
                <Movsview
                  user={userLoged}
                  onSelect={m => this.setState({movSelected: m})}
                />
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
          <TabPane tab="Usuarios" key="4">
            {userSelected ? (
              <UserEdit
                user={userSelected}
                onCancel={() => this.setState({userSelected: null})}
              />
            ) : (
              <UserView
                horizontal
                user={userLoged}
                showOptions={{
                  horizontal: true
                }}
                onSelect={item => this.setState({userSelected: item})}
                onLogout={() => this.setState({userLoged: null})}
              />
            )}
          </TabPane>
          <TabPane tab="Configuracion" key="5">
            <Config />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
