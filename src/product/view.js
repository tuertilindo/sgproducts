import React from "react"
import {
  Selector,
  LineView,
  userPermission,
  getThumbnail,
  showError
} from "../general"
import {Icon, Input, Avatar} from "antd"
import {stocked, getStyleByTypeProd, prodStyles} from "./util"
import PriceView from "./priceView"
import StockView from "./stockView"
import {calculateStock} from "../caja/util"
class View extends React.Component {
  render() {
    const {showSide, data, onSelect, justSelect, user} = this.props
    const permission = userPermission(user)
    return (
      <div>
        <Input
          prefix={<Icon type="barcode" style={{color: "rgba(0,0,0,.25)"}} />}
          placeholder="Agregar el código o buscar..."
          hey={Math.random() + "k"}
          allowClear
          autoFocus
          disabled={!justSelect && !permission.canAdd}
          ref={r => (this.searchInput = r)}
          onPressEnter={i => {
            const s = i.target.value ? i.target.value.toLowerCase() : false
            const p = s
              ? data.filter(c =>
                  c.code ? c.code.toLowerCase() === s : false
                )[0]
              : null
            if (p) {
              onSelect(p)
              this.searchInput.state.value = ""
              showSide(false)
            } else {
              showSide(true, {text: s})
            }
          }}
        />
        {!justSelect ? (
          <div>
            <LineView
              allowed={permission.canAdd}
              title={"Productos"}
              subtitle={"Producto o mercaderias"}
              onSearch={() => showSide(true, {type: "producto"})}
              onClick={() => onSelect({type: "producto"})}
              customStyle={prodStyles["producto"]}
            />
            <LineView
              allowed={permission.canAdd}
              title={"Combos"}
              subtitle={"Multiples productos en uno solo"}
              onSearch={() => showSide(true, {type: "combo"})}
              onClick={() => onSelect({type: "combo"})}
              customStyle={prodStyles["combo"]}
            />
            <LineView
              allowed={permission.canAdd}
              title={"Servicios"}
              subtitle={"Servicios prestados"}
              onSearch={() => showSide(true, {type: "servicio"})}
              onClick={() => onSelect({type: "servicio"})}
              customStyle={prodStyles["servicio"]}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stock: {},
      loading: false
    }
  }
  componentDidMount() {
    window.sgapi
      .getCaja()
      .then(c =>
        this.setState({
          stock: calculateStock(c),
          loading: false
        })
      )
      .catch(e => {
        showError(e)
        this.setState({loading: false})
      })
  }
  render() {
    const {onSelect} = this.props
    const {stock} = this.state

    return (
      <Selector
        target="products"
        icon="tag"
        title="Buscar producto"
        placeholder="buscar por nómbre o descripción..."
        emptyText="No se encontro ningún producto"
        emptyIcon="tag"
        types={{
          all: "Todos",
          producto: "Productos",
          combo: "Combos",
          servicio: "Servicios"
        }}
        avatar={item => <Avatar src={getThumbnail(item)} />}
        typeStyler={getStyleByTypeProd}
        search={stocked(stock)}
        onSelect={onSelect}
        extraList={[
          item => <StockView product={item} />,
          item => <PriceView product={item} />
        ]}
      >
        <View {...this.props} />
      </Selector>
    )
  }
}
