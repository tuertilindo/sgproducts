import React from "react"
import {Row, Col, Badge, Card, Button} from "antd"
import {VictoryPie, VictoryLabel} from "victory"
import {Brush} from "../general"

export default class extends React.Component {
  render() {
    const {
      title,
      data,
      actionText,
      onAction,
      onSearch,
      icon,
      color,
      count
    } = this.props

    return (
      <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <Col xs={24} sm={12} md={16} lg={16}>
          <Card
            actions={[
              <Button
                onClick={() => onAction()}
                type="primary"
                style={{background: color || "green"}}
                icon={icon || "cart"}
              >
                {actionText || "accion"}
              </Button>,
              <Button
                type="link"
                onClick={() => onSearch()}
                shape="round"
                icon="search"
              >
                Buscar
              </Button>
            ]}
            title={title}
            extra={[<Badge count={count || 2} />]}
          >
            {" "}
            <Brush />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <svg viewBox="0 0 400 400">
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              data={data}
              innerRadius={68}
              labelRadius={100}
              style={{labels: {fontSize: 20, fill: "white"}}}
            />
            <VictoryLabel
              textAnchor="middle"
              style={{fontSize: 20}}
              x={200}
              y={200}
              text={title}
            />
          </svg>
        </Col>
      </Row>
    )
  }
}
