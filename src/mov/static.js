import React from "react"
import {Alert, Button, Card} from "antd"
import MovHeader from "./header"
import MovItems from "./items"
import MovFooter from "./footer"
import Pagos from "./pagos"
import "../general/decimal.css"
import {transformMov} from "./util"
import {showError, EditableNumber} from "../general"
export default class extends React.Component {
  render() {
    const {doEdit, mov, onClose} = this.props
    const {items = [], descuentos = [], errors, total, factura} = transformMov(
      mov
    )

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
        <MovHeader mov={mov} onClose={onClose} />
        <Card
          title={" "}
          bordered={false}
          actions={[
            <span />,
            <span />,
            <EditableNumber
              prefix="$"
              title="Total"
              valueStyle={{
                color: "#1122bb",
                fontSize: "16px",
                fontWeight: "200"
              }}
              count={total}
            />
          ]}
        >
          <MovItems items={items} />
        </Card>
        {factura === "a" ? (
          <Card title={"Impuestos"} bordered={false}>
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
          </Card>
        ) : null}
        <Card title={"Pagos"} bordered={false}>
          <Pagos mov={mov} />
        </Card>
        <Button
          disabled={errors.length > 0}
          type="warning"
          onClick={() => {
            window.sgapi
              .saveMov(transformMov(mov), "modify")
              .then(m => doEdit(m))
              .catch(showError)
          }}
          icon="save"
        >
          Cambiar
        </Button>
      </div>
    )
  }
}
