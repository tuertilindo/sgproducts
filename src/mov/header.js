import React from "react"
import "./header.css"
import {Button, Tooltip, Avatar, Row, Col} from "antd"
import {getDestTypePerMov, getStyleByMovType} from "./util"
import {getStyleByClientType} from "../client/util"
import Client from "../client/view"
const moment = require("moment")
export default class extends React.Component {
  render() {
    const {mov = {}, onClose, onSelect} = this.props
    const {target, type, date, factura, createdBy} = mov
    const client = target || {name: "desconocido", type: "responsable"}
    const cstyle = getStyleByClientType(client.type)
    const mstyle = getStyleByMovType(type)

    return (
      <Row gutter={2}>
        <Col span={11}>
          <Client
            justSelect
            filter={{type: getDestTypePerMov(type)}}
            title={
              <div className="movheader" style={{color: cstyle.style.color}}>
                <Avatar style={cstyle.style} icon={cstyle.icon} size="small" />
                <span>{client.name}</span>
              </div>
            }
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
        <Col span={9}>
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
