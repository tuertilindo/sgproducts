import React from "react"
import {Alert, Collapse, Badge, Row, Col, Button} from "antd"
import MovHeader from "./header"
import MovItems from "./items"
import MovFooter from "./footer"
import Pagos from "./pagos"
import Price from "../product/priceView"
import "../general/decimal.css"
import {transformMov} from "./util"
import {saveEntity} from "../general"
const Panel = Collapse.Panel
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = transformMov(props.mov)
  }

  render() {
    const mymov = transformMov(this.state)
    const {
      items = [],
      descuentos = [],
      total = 0,
      subtotal = 0,
      descontado,
      pagos,
      errors,
      code
    } = mymov
    const {onClose} = this.props
    return (
      <div style={{maxWidth: "640px", display: "block", margin: "auto"}}>
        <div>
          {errors.map(e => (
            <Alert
              key={e.index}
              type={e.type}
              message={e.message}
              banner
              closable
            />
          ))}
        </div>
        <MovHeader
          onSelect={c => this.setState({target: c})}
          mov={mymov}
          onClose={onClose}
        />
        <Collapse defaultActiveKey={["1"]}>
          <Panel
            header={
              <span>
                {"Productos agregados "}
                <Badge
                  count={items.length}
                  style={{
                    backgroundColor: "#dfd",
                    color: "#393",
                    boxShadow: "0 0 1px 1px #d9d9d9 inset"
                  }}
                />
              </span>
            }
            key="1"
            extra={<Price value={subtotal} colored />}
          >
            <MovItems
              items={items}
              onDelete={item => {
                this.setState({items: items.filter(i => i.id !== item.id)})
              }}
              onAdd={prod => {
                const {
                  count = 1,
                  code,
                  name = "desconocido",
                  price = {},
                  metrica = "u"
                } = prod
                items.push({
                  count,
                  name,
                  code,
                  metrica,
                  price: price.final || 0,
                  total: parseFloat(count) * parseFloat(price)
                })
                this.setState({items})
              }}
              onUpdate={item => {
                for (let i = 0; i < items.length; i++) {
                  if (items[i].id === item.id) {
                    items[i] = item
                    break
                  }
                }
                this.setState({items})
              }}
            />
          </Panel>
          <Panel
            header={
              <span>
                {"Descuentos, intereses e impuestos "}
                <Badge
                  count={descuentos.length}
                  style={{
                    backgroundColor: "#dfd",
                    color: "#393",
                    boxShadow: "0 0 1px 1px #d9d9d9 inset"
                  }}
                />
              </span>
            }
            key="2"
            extra={<Price value={descontado} colored />}
          >
            <MovFooter
              onDelete={item => {
                for (let i = 0; i < items.length; i++) {
                  if (item.codes.indexOf(items[i].code) >= 0) {
                    items[i].newPrice = 0
                    items[i].newTotal = 0
                  }
                }
                this.setState({items})
              }}
              descuentos={descuentos}
            />
          </Panel>
          <Panel header="Total" key="3" extra={<Price value={total} colored />}>
            <Row gutter={48}>
              <Col span={8}>
                <Price value={subtotal} colored title="Subtotal" />
              </Col>
              <Col span={8}>
                <Price value={descontado} colored title="Descuentos" />
              </Col>
              <Col span={8}>
                <Price value={total} colored title="Total" />
              </Col>
            </Row>
          </Panel>
          <Panel
            header="Pagos"
            key="4"
            extra={<Price value={pagos.pagado} colored />}
          >
            <Pagos mov={mymov} onUpdate={pagos => this.setState({pagos})} />
          </Panel>
        </Collapse>
        <Button
          disabled={errors.length > 0}
          type="primary"
          onClick={() => {
            saveEntity({
              entity: this.state,
              type: "mov",
              getErrors: null,
              key: code
            })
            onClose()
          }}
          icon="save"
        >
          Guardar
        </Button>
      </div>
    )
  }
}
