import React from "react"
import {Selector} from "../general"
import {Button, Icon, Input, PageHeader} from "antd"
import {search, getStyleByTypeProd, prodStyles, extractCodes} from "./util"
class View extends React.Component {
  constructor(props) {
    super(props)
    const {data = []} = props
    this.codes = extractCodes(data)
  }
  render() {
    const {showSide, data, filter, onSelect, justSelect} = this.props
    return (
      <div>
        <Input
          prefix={<Icon type="barcode" style={{color: "rgba(0,0,0,.25)"}} />}
          placeholder="Agregar el código o buscar..."
          hey={Math.random() + "k"}
          allowClear
          autoFocus
          ref={r => (this.searchInput = r)}
          onPressEnter={i => {
            const s = i.target.value
            const p = s ? data.filter(c => c.code === s)[0] : null
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
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() => showSide(true, {type: "producto"})}
              title="Productos"
              subTitle="Producto o mercaderias"
              extra={[
                <Button
                  onClick={() => onSelect({type: "producto"})}
                  icon={prodStyles["producto"].icon}
                  style={prodStyles["producto"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() => showSide(true, {type: "combo"})}
              title="Combos"
              subTitle="Multiples productos en uno solo"
              extra={[
                <Button
                  onClick={() => onSelect({type: "combo"})}
                  icon={prodStyles["combo"].icon}
                  style={prodStyles["combo"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() => showSide(true, {type: "servicio"})}
              title="Servicios"
              subTitle="Servicios prestados"
              extra={[
                <Button
                  onClick={() => onSelect({type: "servicio"})}
                  icon={prodStyles["servicio"].icon}
                  style={prodStyles["servicio"].style}
                  shape="round"
                />
              ]}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

export default class extends React.Component {
  render() {
    const {onSelect} = this.props
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
        typeStyler={getStyleByTypeProd}
        search={search}
        onSelect={onSelect}
      >
        <View {...this.props} />
      </Selector>
    )
  }
}
