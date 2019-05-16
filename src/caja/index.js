import React from "react"
import {Selector, userPermission, showError} from "../general"
import {
  Row,
  Col,
  Card,
  Statistic,
  Icon,
  Alert,
  Button,
  PageHeader,
  Tag,
  Spin
} from "antd"
import {search, transformCaja} from "./util"
import PriceView from "../product/priceView"
import StockView from "../product/stockView"
const moment = require("moment")

class View extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      caja: null,
      loading: true
    }
  }
  componentDidMount() {
    window.sgapi
      .getCaja()
      .then(c =>
        this.setState({
          caja: transformCaja(c),
          loading: false
        })
      )
      .catch(e => {
        showError(e)
        this.setState({loading: false})
      })
  }
  render() {
    const {user} = this.props
    const {caja} = this.state
    if (!caja) {
      return (
        <Alert
          message="No hay una caja iniciada"
          description={
            <span>
              Para realizar operaciones nececita iniciar una caja.{" "}
              <Button
                size="small"
                shape="circle"
                icon="play-circle"
                type="primary"
                onClick={() =>
                  window.sgapi
                    .changeCaja(user)
                    .then(c => this.setState({caja: c}))
                    .catch(showError)
                }
              />
            </span>
          }
          type="warning"
          showIcon
        />
      )
    }
    const permission = userPermission(user)
    const {pagos, title, status, createdAt, createdBy} = caja
    const {efectivo = 0, tarjeta, cuenta} = pagos || {}
    return (
      <div style={{background: "#ECECEC", padding: "10px"}}>
        <Spin spinning={this.state.loading} tip="Obteniendo caja...">
          <PageHeader
            title={title}
            tags={
              <Tag color={status === "open" ? "green" : "red"}>
                {status === "open" ? "en curso" : "cerrada"}
              </Tag>
            }
            extra={[
              <Button
                icon="reload"
                key="1"
                type="primary"
                shape="circle"
                size="small"
                onClick={() =>
                  Promise.resolve(this.setState({loading: true})).then(() =>
                    window.sgapi
                      .getCaja()
                      .then(c =>
                        this.setState({
                          caja: transformCaja(c),
                          loading: false
                        })
                      )
                      .catch(e => {
                        showError(e)
                        this.setState({loading: false})
                      })
                  )
                }
              />
            ]}
            footer={
              <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <Card>
                    <Statistic
                      title="Efectivo"
                      value={efectivo}
                      precision={2}
                      valueStyle={{color: "#3f8600"}}
                      prefix={<Icon type="fire" />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <Card>
                    <Statistic
                      title="Tarjeta"
                      style={{color: "#865626"}}
                      value={tarjeta}
                      precision={2}
                      valueStyle={{color: "#865626"}}
                      prefix={<Icon type="card" />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <Card>
                    <Statistic
                      title="Cuentas"
                      value={cuenta}
                      style={{color: "#aa1100"}}
                      precision={2}
                      valueStyle={{color: "#aa1100"}}
                      prefix={<Icon type="fire" />}
                    />
                  </Card>
                </Col>
              </Row>
            }
          >
            <div className="wrap">
              <span className="movdate">
                {moment(createdAt).format("dddd D [de] MMMM [a las ] HH:mm")}
              </span>
              <div className="content padding">
                {createdBy ? createdBy.name : "desconocido"}
              </div>
            </div>
          </PageHeader>
        </Spin>
      </div>
    )
  }
}

export default class extends React.Component {
  render() {
    const {onSelect} = this.props
    return (
      <Selector
        target="cajas"
        icon="tag"
        title="Buscar caja"
        placeholder="buscar por nómbre o descripción..."
        emptyText="No se encontro ningúna caja"
        emptyIcon="tag"
        search={search}
        onSelect={onSelect}
        extraList={[
          item => <StockView product={item} />,
          item => <PriceView product={item} />
        ]}
      >
        <View {...this.props} />
      </Selector>
    )
  }
}
