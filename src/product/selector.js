import React from "react"
import { List as Lista } from "../general"
import { SidePanel, Filter, isEmptyFilter, getThumbnail } from "../general"
import { Button, Avatar, Icon, List, Input, Tooltip } from "antd"
import { search, extractCodes, getStyleByTypeProd, getProducts } from "./util"
import Stock from "./stockView"
import Price from "./priceView"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: props.filter || {},
      showSide: false
    }
  }

  componentDidMount() {
    getProducts().then(movs => {
      this.setState({ data: Object.values(movs), codes: extractCodes(movs) })
    })
  }
  select(p) {
    const { onSelect = prod => console.log(prod) } = this.props
    this.searchInput.state.value = ""
    onSelect(p)
    this.setState({ visible: false })
  }
  render() {
    const { filter, showAll, data = [], showSide, codes, type } = this.state
    const searched = isEmptyFilter(filter) ? data : search(data, filter)
    const pstyle = getStyleByTypeProd("producto")
    const cstyle = getStyleByTypeProd("combo")
    return (
      <div>
        <Input
          prefix={<Icon type="barcode" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Agregar el por código o buscar..."
          hey={Math.random() + "k"}
          allowClear
          autoFocus
          ref={r => (this.searchInput = r)}
          onPressEnter={i => {
            const s = i.target.value
            const p = s ? codes[s] : null
            if (p) {
              this.select(data[p])
            } else {
              this.setState({
                showSide: true,
                filter: { ...filter, text: s }
              })
            }
          }}
        />
        <Button.Group size="default">
          <Tooltip title="Crear un producto" mouseEnterDelay={1}>
            <Button
              onClick={() => this.select({})}
              style={pstyle.style}
              icon={pstyle.icon}
              shape="round"
            >
              Nuevo Producto
            </Button>
          </Tooltip>
          <Tooltip title="Crear un combo" mouseEnterDelay={1}>
            <Button
              onClick={() => this.select({})}
              style={cstyle.style}
              icon={cstyle.icon}
              shape="round"
            >
              Nuevo Combo
            </Button>
          </Tooltip>
        </Button.Group>

        <SidePanel
          title={
            <List.Item.Meta
              avatar={
                <Avatar>
                  <Icon type="search" />
                </Avatar>
              }
              title="Agregar productos"
              description={
                <Filter
                  filter={filter}
                  hideType
                  placeholder="Nombre"
                  onSearch={filter => this.setState({ filter, showAll: false })}
                />
              }
            />
          }
          onSelect={i => {
            this.select(i)
            this.setState({ showSide: false, selected: i })
          }}
          onClose={() => this.setState({ showSide: false })}
          visible={showSide}
        >
          <Lista
            emptyText="No se encontro ningún producto"
            emptyIcon="tags"
            items={showAll ? searched : searched.slice(0, 10)}
            avatar={item => <Avatar src={getThumbnail(item)} />}
            extraList={[
              item => <Stock product={item} />,
              item => <Price product={item} />
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
