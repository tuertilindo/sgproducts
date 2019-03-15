import React from "react"
import { List as Lista } from "../general"
import { SidePanel, Filter, isEmptyFilter } from "../general"
import { Button, Avatar, Icon, List, Tooltip } from "antd"
import { search, getStyleByClientType, getClients } from "./util"
import { ClientsData } from "../data"

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
      this.setState({ data: Object.values(movs) })
    })
  }
  select(p) {
    const { onSelect = prod => console.log(prod) } = this.props
    onSelect(p)
    this.setState({ showSide: false, selected: p })
  }

  render() {
    const { title, style, className, justSelect } = this.props

    const { filter, showAll, data = [], showSide } = this.state
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
            style={{ float: "right" }}
            shape="circle"
            size="small"
            onClick={() => this.setState({ showSide: true })}
            icon="link"
          />
        </Tooltip>
        {!justSelect ? (
          <Button.Group size="default">
            <Tooltip title="Crear un proveedor" mouseEnterDelay={1}>
              <Button
                onClick={() => this.select({ type: "proveedor" })}
                style={pstyle.style}
                icon={pstyle.icon}
                shape="round"
              >
                Nuevo Proveedor
              </Button>
            </Tooltip>
            <Tooltip title="Crear un cliente" mouseEnterDelay={1}>
              <Button
                onClick={() => this.select({ type: "cliente" })}
                style={cstyle.style}
                icon={cstyle.icon}
                shape="round"
              >
                Nuevo Cliente
              </Button>
            </Tooltip>
          </Button.Group>
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
                  onSearch={filter => this.setState({ filter, showAll: false })}
                />
              }
            />
          }
          onSelect={i => this.select(i)}
          onClose={() => this.setState({ showSide: false })}
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
                style={{ marginLeft: "auto" }}
                onClick={() => this.setState({ showAll: true })}
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
