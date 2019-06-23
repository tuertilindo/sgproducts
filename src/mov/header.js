import React from "react"
import "./headerStyle.css"
import {Button, Tooltip, Avatar, Row, Col} from "antd"
import {getDestTypePerMov, getStyleByMovType} from "./util"
import Client from "../client/view"
const moment = require("moment")
export default class extends React.Component {
  render() {
    const {mov = {}, onClose, onSelect} = this.props
    const {target, type, date, factura, createdBy} = mov
    const client = target || {name: "desconocido", type: "responsable"}
    const mstyle = getStyleByMovType(type)

    return (
      <Row gutter={2}>
        <Col span={15}>
          <Client
            justSelect
            client={{type: getDestTypePerMov(type), ...client}}
            filter={{type: getDestTypePerMov(type)}}
            onSelect={onSelect}
          />
          <div>
            <span className="movdate">{createdBy}</span>
          </div>
        </Col>
        <Col span={3}>
          <Avatar
            className="movfact"
            style={{...mstyle.style, fontSize: "40px"}}
            shape="square"
            size={64}
          >
            {factura}
          </Avatar>
        </Col>
        <Col span={5}>
          <div className="movheader" style={{color: mstyle.style.color}}>
            <Tooltip
              title="Salir sin guardar"
              mouseEnterDelay={1}
              placement="leftTop"
            >
              <Button
                style={{float: "right"}}
                size="small"
                icon="close"
                shape="circle"
                onClick={() => onClose()}
              />
            </Tooltip>
            <span>{type}</span>
            <Avatar
              style={{...mstyle.style, background: "none"}}
              icon={mstyle.icon}
              size={42}
            />
          </div>
          <div>
            <span className="movdate">
              {moment(date).format("dddd D [de] MMMM")}
            </span>
          </div>
        </Col>
      </Row>
    )
  }
}
