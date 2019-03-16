import React from "react"
import {List as Lista} from "../general"
import {SidePanel, Filter, isEmptyFilter} from "../general"
import {Button, Avatar, Icon, List, Tooltip, PageHeader} from "antd"
import {search, getStyleByClientType, getClients, clientStyles} from "./util"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: props.filter || {},
      showSide: false
    }
  }

  componentDidMount() {
    getClients().then(movs => {
      this.setState({data: Object.values(movs)})
    })
  }
  select(p) {
    const {onSelect} = this.props
    onSelect(p)
    this.setState({showSide: false, selected: p})
  }

  render() {
    const {title, style, className, justSelect} = this.props

    const {filter, showAll, data = [], showSide} = this.state
    const searched = isEmptyFilter(filter) ? data : search(data, filter)
    const cstyle = getStyleByClientType("cliente")
    const pstyle = getStyleByClientType("proveedor")
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
            onClick={() => this.setState({showSide: true})}
            icon="link"
          />
        </Tooltip>
        {!justSelect ? (
          <div>
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "cliente"}})
              }
              title="Clientes"
              subTitle="Destinatario de las ventas y presupuestos"
              extra={[
                <Button
                  onClick={() => this.select({type: "cliente"})}
                  icon={clientStyles["cliente"].icon}
                  style={clientStyles["cliente"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "proveedor"}})
              }
              title="Proveedores"
              subTitle="Destinatario de las compras"
              extra={[
                <Button
                  onClick={() => this.select({type: "proveedor"})}
                  icon={clientStyles["proveedor"].icon}
                  style={clientStyles["proveedor"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "sucursal"}})
              }
              title="Sucursales"
              subTitle="Lugar de donde proviene la mercaderia"
              extra={[
                <Button
                  onClick={() => this.select({type: "sucursal"})}
                  icon={clientStyles["sucursal"].icon}
                  style={clientStyles["sucursal"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "responsable"}})
              }
              title="Responsables"
              subTitle="Entidades que manejan el flujo de dinero"
              extra={[
                <Button
                  onClick={() => this.select({type: "responsable"})}
                  icon={clientStyles["responsable"].icon}
                  style={clientStyles["responsable"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "financiera"}})
              }
              title="Financieras"
              subTitle="Entidades bancarias y tarjetas"
              extra={[
                <Button
                  onClick={() => this.select({type: "financiera"})}
                  icon={clientStyles["financiera"].icon}
                  style={clientStyles["financiera"].style}
                  shape="round"
                />
              ]}
            />
          </div>
        ) : null}

        <SidePanel
          placement="left"
          title={
            <List.Item.Meta
              avatar={
                <Avatar>
                  <Icon type="search" />
                </Avatar>
              }
              title="Buscar Destinatarios"
              description={
                <Filter
                  filter={filter}
                  hideType
                  placeholder="Nombre"
                  types={{
                    all: "Todos",
                    cliente: "Clientes",
                    proveedor: "Proveedores",
                    sucursal: "Sucursales",
                    financiera: "Financieras",
                    responsable: "Responsables"
                  }}
                  onSearch={filter => this.setState({filter, showAll: false})}
                />
              }
            />
          }
          onSelect={i => this.select(i)}
          onClose={() => this.setState({showSide: false})}
          visible={showSide}
        >
          <Lista
            emptyText="No se encontro ningún destinatario"
            emptyIcon="user"
            typeStyler={getStyleByClientType}
            items={showAll ? searched : searched.slice(0, 10)}
          />
          {searched.length > 10 && !showAll ? (
            <div
              style={{
                width: "20%",
                margin: "0 auto"
              }}
            >
              <Button
                icon="bars"
                style={{marginLeft: "auto"}}
                onClick={() => this.setState({showAll: true})}
              >
                Ver todo
              </Button>
            </div>
          ) : (
            <div />
          )}
        </SidePanel>
      </div>
    )
  }
}
