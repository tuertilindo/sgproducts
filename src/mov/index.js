import React from "react"
import {Alert, Collapse, Badge, Row, Col, Button} from "antd"
import MovHeader from "./header"
import MovItems from "./items"
import MovFooter from "./footer"
import Pagos from "./pagos"
import Price from "../product/priceView"
import "../general/decimal.css"
import {transformMov, isMoneyOnly} from "./util"
import {showError} from "../general"
import StaticView from "./static"
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
      status,
      errors,
      type
    } = mymov
    const {onClose} = this.props
    if (status === "done") {
      return (
        <StaticView
          mov={mymov}
          onClose={onClose}
          doEdit={m => this.setState(m)}
        />
      )
    }
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
          {!isMoneyOnly(type) ? (
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
                    metrica = "u",
                    combo
                  } = prod
                  items.push({
                    count,
                    name,
                    code,
                    metrica,
                    price: price.final || 0,
                    total: parseFloat(count) * parseFloat(price),
                    combo
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
          ) : null}
          {!isMoneyOnly(type) ? (
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
          ) : null}
          {!isMoneyOnly(type) ? (
            <Panel
              header="Total"
              key="3"
              extra={<Price value={total} colored />}
            >
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
          ) : null}
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
            Promise.resolve(this.setState({loading: true})).then(() => {
              window.sgapi
                .saveMov(transformMov({...this.state, status: "done"}))
                .then(m => this.setState(m))
                .catch(e => {
                  showError(e)
                  this.setState({loading: false})
                })
            })
          }}
          icon="save"
        >
          Guardar
        </Button>
      </div>
    )
  }
}
