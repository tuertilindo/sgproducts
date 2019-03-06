import React from "react";
import { Input, Icon, Drawer } from "antd";
import ProdData from "../data/products";
import Prodview from "../views/productsList";

import { extractCodes } from "../util/product";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codes: extractCodes(ProdData),
      visible: false
    };
  }
  select(p) {
    const { onSelect = prod => console.log(prod) } = this.props;
    this.searchInput.state.value = "";
    onSelect(p);
    this.setState({ visible: false });
  }
  render() {
    const { codes, visible, textToSearch } = this.state;
    return (
      <div>
        <Input
          prefix={<Icon type="barcode" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Agregar el código"
          hey={Math.random() + "k"}
          allowClear
          autoFocus
          ref={r => (this.searchInput = r)}
          onPressEnter={i => {
            const s = i.target.value;

            if (s) {
              let p = codes[s];
              if (p) {
                this.select(ProdData[p]);
              } else {
                this.setState({ visible: true, textToSearch: s });
              }
            }
          }}
        />
        <Drawer
          title="Buscar un producto"
          width="90%"
          closable={true}
          onClose={() => this.setState({ visible: false })}
          visible={visible}
        >
          <Prodview
            horizontal
            textToSearch={textToSearch}
            showOptions={{
              horizontal: true,
              hideCode: true,
              hideTags: true,
              hideShow: true,
              hideEdit: true,
              hideDelete: true,
              hideDescription: false
            }}
            onSelect={t => this.select(t)}
            products={ProdData}
          />
        </Drawer>
      </div>
    );
  }
}
