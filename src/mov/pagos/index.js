import React from "react"
import {getConfig, EditableNumber2} from "../../general"

import {Icon, Tabs, Tag, Alert, Tooltip} from "antd"
import {getStyleByPay, payStatus} from "../util"
import fillPagos from "../util/fillPagos"

const efectivost = getStyleByPay("efectivo")
const vueltost = getStyleByPay("vuelto")
const tarjetast = getStyleByPay("tarjeta")
const chequest = getStyleByPay("cheque")
const cuentast = getStyleByPay("cuenta")

const TabPane = Tabs.TabPane
const colorTag = {
  efectivo: "green",
  cheque: "blue",
  cuenta: "purple",
  vuelto: "magenta",
  tarjeta: "orange"
}
export default class extends React.Component {
  render() {
    const {mov, onUpdate} = this.props
    const {pagos = {}, type} = mov
    const autopagar = getConfig().autoPagar
    const list = fillPagos(pagos)
    const payst = payStatus(mov)
    const active = payst.vuelto > 0 ? "vuelto" : "efectivo"
    return (
      <div>
        <Tabs key={active} defaultActiveKey={active}>
          <TabPane
            disabled={!payst.canPayEfectivo}
            tab={
              <span>
                <Icon style={efectivost.style} type={efectivost.icon} />
                Efectivo
              </span>
            }
            key="efectivo"
          >
            {payst.canPayEfectivo ? (
              <EditableNumber2
                title={"Realizar pagos en efectivo"}
                buttonText={"Efectivo"}
                resetToZero
                count={payst.efectivo}
                icon={efectivost.icon}
                color={efectivost.style.color}
                onOk={({value, text}) =>
                  onUpdate({...pagos, efectivo: {total: value}})
                }
                constraints={{
                  value: {
                    numericality: {
                      greaterThan: 0,
                      notGreaterThan: "El monto debe ser mayor que 0"
                    }
                  }
                }}
              />
            ) : (
              <Alert
                type={"info"}
                message="En este momento no se pueden realizar mas pagos en efectivo"
                banner
              />
            )}
          </TabPane>
          <TabPane
            disabled={!payst.canPayVuelto}
            tab={
              <span>
                <Icon style={vueltost.style} type={vueltost.icon} />
                Vuelto
              </span>
            }
            key="vuelto"
          >
            {payst.canPayVuelto ? (
              <EditableNumber2
                title={"Dar vuelto en efectivo"}
                buttonText={"Vuelto"}
                count={payst.vuelto}
                resetToZero
                icon={vueltost.icon}
                color={vueltost.style.color}
                onOk={({value, text}) =>
                  onUpdate({...pagos, vuelto: {total: value}})
                }
                constraints={{
                  value: {
                    numericality: {
                      greaterThan: 0,
                      lessThanOrEqualTo: 30,
                      notGreaterThan: "El monto debe ser mayor que 0"
                    }
                  }
                }}
              />
            ) : (
              <Alert
                type={"info"}
                message="No hay exedente como para dar un vuelto en este momento"
                banner
              />
            )}
          </TabPane>
          <TabPane
            disabled
            tab={
              <span>
                <Icon style={tarjetast.style} type={tarjetast.icon} />
                Tarjetas
              </span>
            }
            key="3"
          >
            <EditableNumber2
              buttonText={"Tarjeta"}
              resetToZero
              icon={tarjetast.icon}
              color={tarjetast.style.color}
              onOk={v => console.log(v)}
              placeholder="Código de transacción"
              constraints={{
                value: {
                  numericality: {
                    greaterThan: 0,
                    lessThanOrEqualTo: 30
                  }
                }
              }}
            />
          </TabPane>
          <TabPane
            disabled
            tab={
              <span>
                <Icon style={cuentast.style} type={cuentast.icon} />
                Cuentas
              </span>
            }
            key="4"
          >
            <EditableNumber2
              buttonText={"Cuenta"}
              resetToZero
              icon={cuentast.icon}
              color={cuentast.style.color}
              onOk={v => console.log(v)}
              constraints={{
                value: {
                  numericality: {
                    greaterThan: 0,
                    lessThanOrEqualTo: 30
                  }
                }
              }}
            />
          </TabPane>
          <TabPane
            disabled
            tab={
              <span>
                <Icon style={chequest.style} type={chequest.icon} />
                Cheque
              </span>
            }
            key="5"
          >
            <EditableNumber2
              buttonText={"Cheque"}
              resetToZero
              icon={chequest.icon}
              color={chequest.style.color}
              onOk={v => console.log(v)}
              constraints={{
                value: {
                  numericality: {
                    greaterThan: 0,
                    lessThanOrEqualTo: 30
                  }
                }
              }}
            />
          </TabPane>
        </Tabs>
        {list.map(p => (
          <Tooltip title={p.name}>
            <Tag
              closable
              color={colorTag[p.type] || "red"}
              onClose={e => {
                e.preventDefault()
                let ps = pagos
                ps[p.type] = null
                onUpdate(ps)
              }}
            >
              <Icon type={getStyleByPay(p.type).icon} /> ${p.price}
            </Tag>
          </Tooltip>
        ))}
      </div>
    )
  }
}
