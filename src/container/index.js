import React from "react";
import { Tabs, BackTop } from "antd";
import Prodsview from "../product/view";
import Prodedit from "../product";
import Clientview from "../client/view";
import ClientEdit from "../client";
import UserView from "../user/view";
import UserEdit from "../user";
import Movsview from "../mov/view";
import Movview from "../mov";
import Config from "./config";
import Login from "../user/login";
import { userPermission } from "../general";
const TabPane = Tabs.TabPane;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movSelected: null,
      productSelected: null,
      clientSelected: null,
      userSelected: null,
      userLoged: null
    };
  }

  render() {
    const {
      movSelected,
      productSelected,
      clientSelected,
      userSelected,
      userLoged
    } = this.state;
    if (!userLoged) {
      return <Login onLogin={u => this.setState({ userLoged: u })} />;
    }
    const permission = userPermission(userLoged);
    return (
      <div style={{ maxWidth: "640px", display: "block", margin: "auto" }}>
        <BackTop style={{ right: 5 }} visibilityHeight={300} />

        <Tabs defaultActiveKey="1">
          <TabPane tab="Movimientos" key="1">
            {movSelected ? (
              <Movview
                user={userLoged}
                mov={movSelected}
                onClose={() => this.setState({ movSelected: null })}
              />
            ) : (
              <div>
                <Movsview
                  user={userLoged}
                  onSelect={m => this.setState({ movSelected: m })}
                />
              </div>
            )}
          </TabPane>
          <TabPane disabled={!permission.canAdd} tab="Productos" key="2">
            {productSelected ? (
              <Prodedit
                user={userLoged}
                onCancel={() => this.setState({ productSelected: null })}
                product={productSelected}
              />
            ) : (
              <Prodsview
                user={userLoged}
                onSelect={item => this.setState({ productSelected: item })}
              />
            )}
          </TabPane>
          <TabPane disabled={!permission.canAdd} tab="Destinatarios" key="3">
            {clientSelected ? (
              <ClientEdit
                user={userLoged}
                client={clientSelected}
                onCancel={() => this.setState({ clientSelected: null })}
              />
            ) : (
              <Clientview
                user={userLoged}
                onSelect={item => this.setState({ clientSelected: item })}
              />
            )}
          </TabPane>
          <TabPane tab="Usuarios" key="4">
            {userSelected ? (
              <UserEdit
                user={userSelected}
                onCancel={() => this.setState({ userSelected: null })}
              />
            ) : (
              <UserView
                user={userLoged}
                onSelect={item => this.setState({ userSelected: item })}
                onLogout={() => this.setState({ userLoged: null })}
              />
            )}
          </TabPane>
          <TabPane disabled={!permission.isAdmin} tab="Configuracion" key="5">
            <Config />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
