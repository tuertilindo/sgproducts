import React from "react"
import {Selector, LineView, userPermission} from "../general"
import {extractMovs} from "../caja/util"
import {search, getStyleByMovType, MovStyles, createNewMov} from "./util"
import PriceView from "../product/priceView"
const View = ({showSide, justSelect, onSelect, user}) => {
  const newMov = t => createNewMov(t, user)
  const permission = userPermission(user)
  return (
    <div>
      {!justSelect ? (
        <div>
          <LineView
            key="ventas"
            allowed={permission.canSell}
            title={"Ventas"}
            subtitle={"Ventas a clientes"}
            onSearch={() => showSide(true, {type: "venta"})}
            onClick={() => onSelect(newMov("venta"))}
            customStyle={MovStyles["venta"]}
          />
          <LineView
            key="Devoluciones"
            allowed={permission.canBack}
            title={"Devoluciones"}
            subtitle={"Devolución de mercaderia a clientes"}
            onSearch={() => showSide(true, {type: "devolucion"})}
            onClick={() => onSelect(newMov("devolucion"))}
            customStyle={MovStyles["devolucion"]}
          />
          <LineView
            key="Presupuestos"
            allowed={permission.canSell}
            title={"Presupuestos"}
            subtitle={"Presupuestos a clientes"}
            onSearch={() => showSide(true, {type: "presupuesto"})}
            onClick={() => onSelect(newMov("presupuesto"))}
            customStyle={MovStyles["presupuesto"]}
          />
          <LineView
            key="Compras"
            allowed={permission.canBuy}
            title={"Compras"}
            subtitle={"Compra a proveedor"}
            onSearch={() => showSide(true, {type: "compra"})}
            onClick={() => onSelect(newMov("compra"))}
            customStyle={MovStyles["compra"]}
          />
          <LineView
            key="Retornos"
            allowed={permission.canBuy}
            title={"Retornos"}
            subtitle={"Devolución de mercaderia al proveedor"}
            onSearch={() => showSide(true, {type: "retorno"})}
            onClick={() => onSelect(newMov("retorno"))}
            customStyle={MovStyles["retorno"]}
          />
          <LineView
            key="Pedidos"
            allowed={permission.canBuy}
            title={"Pedidos"}
            subtitle={"Orden de pedidos al proveedor"}
            onSearch={() => showSide(true, {type: "pedido"})}
            onClick={() => onSelect(newMov("pedido"))}
            customStyle={MovStyles["pedido"]}
          />
          <LineView
            key="Entradas"
            allowed={permission.canBuy}
            title={"Entradas"}
            subtitle={"Entrada de mercaderia desde sucursal"}
            onSearch={() => showSide(true, {type: "entrada"})}
            onClick={() => onSelect(newMov("entrada"))}
            customStyle={MovStyles["entrada"]}
          />
          <LineView
            key="Salidas"
            allowed={permission.canBuy}
            title={"Salidas"}
            subtitle={"Envios de mercaderia a otra sucursal"}
            onSearch={() => showSide(true, {type: "salida"})}
            onClick={() => onSelect(newMov("salida"))}
            customStyle={MovStyles["salida"]}
          />
          <LineView
            key="Depositos"
            allowed={permission.canBuy}
            title={"Depositos"}
            subtitle={"Depositos de dinero en la caja"}
            onSearch={() => showSide(true, {type: "deposito"})}
            onClick={() => onSelect(newMov("deposito"))}
            customStyle={MovStyles["deposito"]}
          />
          <LineView
            key="Extraccion"
            allowed={permission.canBuy}
            title={"Extracciones"}
            subtitle={"Extracción de dinero de la caja"}
            onSearch={() => showSide(true, {type: "extraccion"})}
            onClick={() => onSelect(newMov("extraccion"))}
            customStyle={MovStyles["extraccion"]}
          />
        </div>
      ) : null}
    </div>
  )
}

export default class extends React.Component {
  render() {
    const {onSelect, filter} = this.props
    const {type} = filter || {}
    const specificType = type && type !== "all" ? type : null
    const typeDescr = specificType ? specificType : "movimiento"
    return (
      <Selector
        customList={() => {
          return window.sgapi.getCaja().then(extractMovs)
        }}
        filter={filter}
        hideType={specificType}
        icon="database"
        title={"Buscar " + typeDescr}
        placement="left"
        placeholder="buscar por cliente..."
        types={{
          all: "Todos",
          venta: "Ventas",
          compra: "Compras",
          devolucion: "Devoluciones",
          retorno: "Retornos",
          entrada: "Entrada",
          salida: "Salidas"
        }}
        emptyText={"No se encontro ningún " + typeDescr}
        emptyIcon="database"
        typeStyler={getStyleByMovType}
        search={search}
        onSelect={onSelect}
        extraList={[item => <PriceView value={item.total} />]}
      >
        <View {...this.props} />
      </Selector>
    )
  }
}
