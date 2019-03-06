import React from "react";
import { Tabs, BackTop } from "antd";
import Prodsview from "./productsList";
import Prodedit from "../inputs/productEditor";
import Clientview from "./clientList";
import Movsview from "./movsList";
import Movview from "./mov";
import { transformMov } from "../util/movs";
import { ProductsData, MovsData, ClientsData } from "../data";
const TabPane = Tabs.TabPane;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movSelected: null,
      productSelected: null
    };
  }
  render() {
    const { movSelected, productSelected } = this.state;
    return (
      <div>
        <BackTop style={{ right: 5 }} visibilityHeight={300} />

        <Tabs defaultActiveKey="1">
          <TabPane tab="Movimientos" key="1">
            {movSelected ? (
              <Movview
                mov={movSelected}
                onClose={() => this.setState({ movSelected: null })}
              />
            ) : (
              <Movsview
                showOptions={{
                  horizontal: true,
                  hideCode: false,
                  hideTags: true,
                  hideShow: true,
                  hideEdit: true,
                  hideDelete: true,
                  hideDescription: false
                }}
                onSelect={item =>
                  this.setState({ movSelected: transformMov(item) })
                }
                movs={MovsData}
              />
            )}
          </TabPane>
          <TabPane tab="Productos" key="2">
            {productSelected ? (
              <Prodedit
                onCancel={() => this.setState({ productSelected: null })}
                product={productSelected}
              />
            ) : (
              <Prodsview
                horizontal
                showOptions={{
                  horizontal: true,
                  hideCode: true,
                  hideTags: true,
                  hideShow: true,
                  hideEdit: true,
                  hideDelete: true,
                  hideDescription: false
                }}
                onSelect={item => this.setState({ productSelected: item })}
                products={ProductsData}
              />
            )}
          </TabPane>
          <TabPane tab="Clientes" key="3">
            <Clientview
              horizontal
              showOptions={{
                horizontal: true
              }}
              onSelect={item => console.log(item)}
              clients={ClientsData}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
