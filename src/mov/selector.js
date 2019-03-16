import React from "react"
import {SidePanel, Filter, List as Lista, isEmptyFilter} from "../general"
import {
  Button,
  Avatar,
  Icon,
  List,
  Statistic,
  Tooltip,
  Card,
  PageHeader,
  Tag
} from "antd"
import {
  search,
  getStyleByMovType,
  MovStyles,
  createNewMov,
  getMovs
} from "./util"

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
    getMovs().then(movs => this.setState({data: Object.values(movs)}))
  }

  render() {
    const {onSelect, justSelect} = this.props
    const {filter, showAll, data = [], showSide} = this.state
    const searched = isEmptyFilter(filter) ? data : search(data, filter)
    const {type} = filter || {}
    const style = getStyleByMovType(type)
    return (
      <div>
        {!justSelect ? (
          <div>
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "venta"}})
              }
              title="Ventas"
              subTitle="Ventas a clientes"
              extra={[
                <Button
                  onClick={() => onSelect(createNewMov("venta"))}
                  icon={MovStyles["venta"].icon}
                  style={MovStyles["venta"].style}
                  shape="round"
                  Tooltip="Vender a cliente"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "devolucion"}})
              }
              title="Devoluciones"
              subTitle="Devolución de mercaderia a clientes"
              extra={[
                <Button
                  onClick={() => onSelect(createNewMov("devolucion"))}
                  icon={MovStyles["devolucion"].icon}
                  style={MovStyles["devolucion"].style}
                  shape="round"
                  Tooltip="Vender a cliente"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "presupuesto"}})
              }
              title="Presupuestos"
              subTitle="Presupuestos a clientes"
              extra={[
                <Button
                  onClick={() => onSelect(createNewMov("presupuesto"))}
                  icon={MovStyles["presupuesto"].icon}
                  style={MovStyles["presupuesto"].style}
                  shape="round"
                  Tooltip="Vender a cliente"
                />
              ]}
            />

            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "compra"}})
              }
              title="Compras"
              subTitle="Compra a proveedor"
              extra={[
                <Button
                  onClick={() => onSelect(createNewMov("compra"))}
                  icon={MovStyles["compra"].icon}
                  style={MovStyles["compra"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "retorno"}})
              }
              title="Retornos"
              subTitle="Devolución de mercaderia al proveedor"
              extra={[
                <Button
                  onClick={() => onSelect(createNewMov("retorno"))}
                  icon={MovStyles["retorno"].icon}
                  style={MovStyles["retorno"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "pedido"}})
              }
              title="Pedidos"
              subTitle="Orden de pedidos al proveedor"
              extra={[
                <Button
                  onClick={() => onSelect(createNewMov("pedido"))}
                  icon={MovStyles["pedido"].icon}
                  style={MovStyles["pedido"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "entrada"}})
              }
              title="Entradas"
              subTitle="Entrada de mercaderia desde sucursal"
              extra={[
                <Button
                  onClick={() => onSelect(createNewMov("entrada"))}
                  icon={MovStyles["entrada"].icon}
                  style={MovStyles["entrada"].style}
                  shape="round"
                />
              ]}
            />
            <PageHeader
              backIcon={<Icon type="search" />}
              onBack={() =>
                this.setState({showSide: true, filter: {type: "salida"}})
              }
              title="Salidas"
              subTitle="Envios de mercaderia a otra sucursal"
              extra={[
                <Button
                  onClick={() => onSelect(createNewMov("salida"))}
                  icon={MovStyles["salida"].icon}
                  style={MovStyles["salida"].style}
                  shape="round"
                />
              ]}
            />
          </div>
        ) : null}

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
                  onSearch={filter => this.setState({filter, showAll: false})}
                />
              }
            />
          }
          onSelect={i => {
            onSelect(i)
            this.setState({showSide: false})
          }}
          onClose={() => this.setState({showSide: false})}
          visible={showSide}
        >
          <Lista
            emptyText={
              "No se encontró " + (type && type !== "all" ? type : "movimiento")
            }
            emptyIcon={style.icon}
            items={showAll ? searched : searched.slice(0, 10)}
            typeStyler={getStyleByMovType}
            extraList={[
              item => {
                const {style} = getStyleByMovType(item.type)
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
