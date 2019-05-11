import React from "react"
import {Selector, userPermission} from "../general"
import {Row, Col, Card, Statistic, Icon} from "antd"
import {search} from "./util"
import PriceView from "../product/priceView"
import StockView from "../product/stockView"
class View extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      caja: {}
    }
  }
  componentDidMount() {
    window.sgapi.getCaja(this.props.user).then(c => this.setState({caja: c}))
  }
  render() {
    const {user} = this.props
    const {caja} = this.state
    const permission = userPermission(user)
    const {efectivo = 0} = caja || {}
    return (
      <div style={{background: "#ECECEC", padding: "10px"}}>
        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col xs={12} sm={8} md={6} lg={4}>
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
          <Col xs={12} sm={8} md={6} lg={4}>
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
          <Col xs={12} sm={8} md={6} lg={4}>
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
        </Row>
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
