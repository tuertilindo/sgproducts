import React from "react"
import {Selector} from "../general"
import {Button, Icon, Tooltip, PageHeader} from "antd"
import {search, getStyleByClientType, clientStyles} from "./util"

const View = ({showSide, ...props}) => {
  const {title, style, className, justSelect, onSelect} = props

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
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "cliente"})}
            title="Clientes"
            subTitle="Destinatario de las ventas y presupuestos"
            extra={[
              <Button
                onClick={() => onSelect({type: "cliente"})}
                icon={clientStyles["cliente"].icon}
                style={clientStyles["cliente"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "proveedor"})}
            title="Proveedores"
            subTitle="Destinatario de las compras"
            extra={[
              <Button
                onClick={() => onSelect({type: "proveedor"})}
                icon={clientStyles["proveedor"].icon}
                style={clientStyles["proveedor"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "sucursal"})}
            title="Sucursales"
            subTitle="Lugar de donde proviene la mercaderia"
            extra={[
              <Button
                onClick={() => onSelect({type: "sucursal"})}
                icon={clientStyles["sucursal"].icon}
                style={clientStyles["sucursal"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "responsable"})}
            title="Responsables"
            subTitle="Entidades que manejan el flujo de dinero"
            extra={[
              <Button
                onClick={() => onSelect({type: "responsable"})}
                icon={clientStyles["responsable"].icon}
                style={clientStyles["responsable"].style}
                shape="round"
              />
            ]}
          />
          <PageHeader
            backIcon={<Icon type="search" />}
            onBack={() => showSide(true, {type: "financiera"})}
            title="Financieras"
            subTitle="Entidades bancarias y tarjetas"
            extra={[
              <Button
                onClick={() => onSelect({type: "financiera"})}
                icon={clientStyles["financiera"].icon}
                style={clientStyles["financiera"].style}
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
