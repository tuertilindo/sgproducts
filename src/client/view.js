import React from "react"
import {Selector, LineView, userPermission} from "../general"
import {Button, Icon, Tooltip, PageHeader} from "antd"
import {search, getStyleByClientType, clientStyles} from "./util"

const View = ({
  showSide,
  title,
  style,
  className,
  user,
  justSelect,
  onSelect
}) => {
  const permission = userPermission(user)
  return (
    <div>
      <span style={style} className={className}>
        {title}
      </span>
      <Tooltip
        title="Cambiar Destinatario"
        mouseEnterDelay={1}
        placement="right"
      >
        <Button
          style={{float: "right"}}
          shape="circle"
          size="small"
          onClick={() => showSide(true)}
          icon="link"
        />
      </Tooltip>
      {!justSelect ? (
        <div>
          <LineView
            allowed={permission.canAdd}
            title={"Clientes"}
            subtitle={"Destinatario de las ventas"}
            onSearch={() => showSide(true, {type: "cliente"})}
            onClick={() => onSelect({type: "cliente"})}
            customStyle={clientStyles["cliente"]}
          />
          <LineView
            allowed={permission.canAdd}
            title={"Proveedores"}
            subtitle={"Destinatario de las compras"}
            onSearch={() => showSide(true, {type: "proveedor"})}
            onClick={() => onSelect({type: "proveedor"})}
            customStyle={clientStyles["proveedor"]}
          />
          <LineView
            allowed={permission.canAdd}
            title={"Sucursales"}
            subtitle={"Lugar de donde proviene la mercaderia"}
            onSearch={() => showSide(true, {type: "sucursal"})}
            onClick={() => onSelect({type: "sucursal"})}
            customStyle={clientStyles["sucursal"]}
          />
          <LineView
            allowed={permission.canAdd}
            title={"Responsables"}
            subtitle={"Entidades que manejan el flujo de dinero"}
            onSearch={() => showSide(true, {type: "responsable"})}
            onClick={() => onSelect({type: "responsable"})}
            customStyle={clientStyles["responsable"]}
          />
          <LineView
            allowed={permission.canAdd}
            title={"Financieras"}
            subtitle={"Entidades bancarias y tarjetas"}
            onSearch={() => showSide(true, {type: "financiera"})}
            onClick={() => onSelect({type: "financiera"})}
            customStyle={clientStyles["financiera"]}
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
    return (
      <Selector
        target={"clients"}
        filter={filter}
        hideType={type && type !== "all"}
        icon="user"
        title="Buscar destinatario"
        placement="left"
        placeholder="buscar nómbre..."
        types={{
          all: "Todos",
          cliente: "Clientes",
          proveedor: "Proveedores",
          sucursal: "Sucursales",
          financiera: "Financieras",
          responsable: "Responsables"
        }}
        emptyText="No se encontro ningún destinatario"
        emptyIcon="user"
        typeStyler={getStyleByClientType}
        search={search}
        onSelect={onSelect}
      >
        <View {...this.props} />
      </Selector>
    )
  }
}
