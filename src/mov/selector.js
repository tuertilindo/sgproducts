import React from "react"
import { SidePanel, Filter, List as Lista, isEmptyFilter } from "../general"
import { Button, Avatar, Icon, List, Statistic, Tooltip } from "antd"
import { search, getStyleByMovType, createNewMov, getMovs } from "./util"
import { MovsData } from "../data"

const createButton = (movType, title, onSelect) => {
  const style = getStyleByMovType(movType)
  const icon =
    movType === "devolucion" ||
    movType === "retorno" ||
    movType === "salida" ||
    movType === "extraccion"
      ? "minus"
      : "plus"
  return (
    <Tooltip title={title} mouseEnterDelay={1}>
      <Button
        onClick={() => onSelect(createNewMov(movType))}
        style={style.style}
        icon={style.icon}
        shape="round"
      >
        <Icon type={icon} />
      </Button>
    </Tooltip>
  )
}
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: props.filter || {},
      showSide: false
    }
  }

  componentDidMount() {
    getMovs().then(movs => this.setState({ data: Object.values(movs) }))
  }

  render() {
    const { onSelect } = this.props
    const { filter, showAll, data = [], showSide } = this.state
    const searched = isEmptyFilter(filter) ? data : search(data, filter)

    return (
      <div>
        <Button
          onClick={() => this.setState({ showSide: true })}
          icon="search"
          shape="round"
        >
          Buscar
        </Button>
        <Button.Group size="default">
          {createButton("venta", "Crear una venta", onSelect)}
          {createButton("devolucion", "Devolver mercaderia", onSelect)}
          {createButton("presupuesto", "Crear un presupuesto", onSelect)}
        </Button.Group>
        <Button.Group size="default">
          {createButton("compra", "Comprar mercaderia", onSelect)}
          {createButton("retorno", "Retorno a proveedor", onSelect)}
          {createButton("pedido", "Generar un pedido", onSelect)}
        </Button.Group>
        <Button.Group size="default">
          {createButton("entrada", "Recibir mercaderia", onSelect)}
          {createButton("salida", "Enviar mercaderia", onSelect)}
        </Button.Group>
        <SidePanel
          title={
            <List.Item.Meta
              avatar={
                <Avatar>
                  <Icon type="search" />
                </Avatar>
              }
              title="Buscar movimientos"
              description={
                <Filter
                  filter={filter}
                  placeholder="cliente"
                  types={{
                    all: "Todos",
                    venta: "Ventas",
                    compra: "Compras",
                    devolucion: "Devoluciones",
                    retorno: "Retornos",
                    entrada: "Entrada",
                    salida: "Salidas"
                  }}
                  onSearch={filter => this.setState({ filter, showAll: false })}
                />
              }
            />
          }
          onSelect={i => {
            onSelect(i)
            this.setState({ showSide: false })
          }}
          onClose={() => this.setState({ showSide: false })}
          visible={showSide}
        >
          <Lista
            items={showAll ? searched : searched.slice(0, 10)}
            typeStyler={getStyleByMovType}
            extraList={[
              item => {
                const { style } = getStyleByMovType(item.type)
                return (
                  <Statistic
                    value={item.total}
                    precision={2}
                    valueStyle={{
                      color: style.color
                    }}
                    prefix="$"
                  />
                )
              }
            ]}
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
