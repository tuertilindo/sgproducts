import React from "react"
import {Selector, LineView, userPermission} from "../general"
import {search, getStyleByMovType, MovStyles, createNewMov} from "./util"

const View = ({showSide, justSelect, onSelect, user}) => {
  const newMov = t => createNewMov(t, user)
  const permission = userPermission(user)
  return (
    <div>
      {!justSelect ? (
        <div>
          <LineView
            allowed={permission.canSell}
            title={"Ventas"}
            subtitle={"Ventas a clientes"}
            onSearch={() => showSide(true, {type: "venta"})}
            onClick={() => onSelect(newMov("venta"))}
            customStyle={MovStyles["venta"]}
          />
          <LineView
            allowed={permission.canBack}
            title={"Devoluciones"}
            subtitle={"Devolución de mercaderia a clientes"}
            onSearch={() => showSide(true, {type: "devolucion"})}
            onClick={() => onSelect(newMov("devolucion"))}
            customStyle={MovStyles["devolucion"]}
          />
          <LineView
            allowed={permission.canSell}
            title={"Presupuestos"}
            subtitle={"Presupuestos a clientes"}
            onSearch={() => showSide(true, {type: "presupuesto"})}
            onClick={() => onSelect(newMov("presupuesto"))}
            customStyle={MovStyles["presupuesto"]}
          />
          <LineView
            allowed={permission.canBuy}
            title={"Compras"}
            subtitle={"Compra a proveedor"}
            onSearch={() => showSide(true, {type: "compra"})}
            onClick={() => onSelect(newMov("compra"))}
            customStyle={MovStyles["compra"]}
          />
          <LineView
            allowed={permission.canBuy}
            title={"Retornos"}
            subtitle={"Devolución de mercaderia al proveedor"}
            onSearch={() => showSide(true, {type: "retorno"})}
            onClick={() => onSelect(newMov("retorno"))}
            customStyle={MovStyles["retorno"]}
          />
          <LineView
            allowed={permission.canBuy}
            title={"Pedidos"}
            subtitle={"Orden de pedidos al proveedor"}
            onSearch={() => showSide(true, {type: "pedido"})}
            onClick={() => onSelect(newMov("pedido"))}
            customStyle={MovStyles["pedido"]}
          />
          <LineView
            allowed={permission.canBuy}
            title={"Entradas"}
            subtitle={"Entrada de mercaderia desde sucursal"}
            onSearch={() => showSide(true, {type: "entrada"})}
            onClick={() => onSelect(newMov("entrada"))}
            customStyle={MovStyles["entrada"]}
          />
          <LineView
            allowed={permission.canBuy}
            title={"Salidas"}
            subtitle={"Envios de mercaderia a otra sucursal"}
            onSearch={() => showSide(true, {type: "salida"})}
            onClick={() => onSelect(newMov("salida"))}
            customStyle={MovStyles["salida"]}
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
        target={"movs"}
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
      >
        <View {...this.props} />
      </Selector>
    )
  }
}
