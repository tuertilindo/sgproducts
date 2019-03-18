import React from "react"
import {Selector} from "../general"
import {Button, Icon, PageHeader} from "antd"
import {search, getStyleByMovType, MovStyles, createNewMov} from "./util"

const View = ({showSide, justSelect, onSelect, user}) => {
  const newMov = t => createNewMov(t, user)
  return (
    <div>
      {!justSelect ? (
        <div>
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "venta"})}
            title="Ventas"
            subTitle="Ventas a clientes"
            extra={[
              <Button
                onClick={() => onSelect(newMov("venta"))}
                icon={MovStyles["venta"].icon}
                style={MovStyles["venta"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "devolucion"})}
            title="Devoluciones"
            subTitle="Devolución de mercaderia a clientes"
            extra={[
              <Button
                onClick={() => onSelect(newMov("devolucion"))}
                icon={MovStyles["devolucion"].icon}
                style={MovStyles["devolucion"].style}
                shape="round"
                Tooltip="Vender a cliente"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "presupuesto"})}
            title="Presupuestos"
            subTitle="Presupuestos a clientes"
            extra={[
              <Button
                onClick={() => onSelect(newMov("presupuesto"))}
                icon={MovStyles["presupuesto"].icon}
                style={MovStyles["presupuesto"].style}
                shape="round"
                Tooltip="Vender a cliente"
              />
            ]}
          />

          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "compra"})}
            title="Compras"
            subTitle="Compra a proveedor"
            extra={[
              <Button
                onClick={() => onSelect(newMov("compra"))}
                icon={MovStyles["compra"].icon}
                style={MovStyles["compra"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "retorno"})}
            title="Retornos"
            subTitle="Devolución de mercaderia al proveedor"
            extra={[
              <Button
                onClick={() => onSelect(newMov("retorno"))}
                icon={MovStyles["retorno"].icon}
                style={MovStyles["retorno"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "pedido"})}
            title="Pedidos"
            subTitle="Orden de pedidos al proveedor"
            extra={[
              <Button
                onClick={() => onSelect(newMov("pedido"))}
                icon={MovStyles["pedido"].icon}
                style={MovStyles["pedido"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "entrada"})}
            title="Entradas"
            subTitle="Entrada de mercaderia desde sucursal"
            extra={[
              <Button
                onClick={() => onSelect(newMov("entrada"))}
                icon={MovStyles["entrada"].icon}
                style={MovStyles["entrada"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "salida"})}
            title="Salidas"
            subTitle="Envios de mercaderia a otra sucursal"
            extra={[
              <Button
                onClick={() => onSelect(newMov("salida"))}
                icon={MovStyles["salida"].icon}
                style={MovStyles["salida"].style}
                shape="round"
              />
            ]}
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
