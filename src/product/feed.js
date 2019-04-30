import React from "react"
import {Input, Spin, Button, Progress, Alert} from "antd"
import {showError} from "../general"
import {updatePrice} from "./util"

export default class extends React.Component {
  state = {
    path: "https://mascocitas.com/sgapi/dig/products?show=price",
    loading: false,
    total: 0,
    left: 0,
    error: null
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  async task(list) {
    if (list.length > 0) {
      const code = list[0].Codigo || list[0].code
      let old = {
        price: {}
      }
      let error = null
      if (code) {
        try {
          old = await window.sgapi.getEntity(code, "products")
          error = {
            message: "actualizando producto: " + code,
            type: "success"
          }
        } catch (e) {
          error = {
            message: "no se pudo obtener información previa de " + code,
            type: "warning"
          }
        }
        let price = updatePrice(old.price, list[0].Precio || list[0].price || 0)
        const prod = {
          name: list[0].Nombre || list[0].name || old.name,
          code: code,
          price,
          type: list[0].type || "producto"
        }
        await this.sleep(50)
        await window.sgapi.saveEntity(prod, "products").catch(showError)
      }

      return Promise.resolve(this.task(list.slice(1))).then(
        this.setState({left: list.length, error})
      )
    }
  }

  render() {
    const {path, loading, total, left, error} = this.state
    const current = total - left
    if (current < total - 1) {
      return (
        <div>
          <Progress percent={(current * 100) / total} status="active" />
          {error ? (
            <Alert type={error.type} message={error.message} banner />
          ) : null}
        </div>
      )
    }
    return (
      <Spin spinning={loading} tip="Obteniendo..." delay={200}>
        {current === total - 1 ? <Progress percent={100} /> : null}
        <Input
          defaultValue="https://mascocitas.com/sgapi/dig/products?show=price"
          onChange={e => this.setState({path: e.target.value})}
          placeholder="dirección de la lista de productos"
        />
        <Button
          type="primary"
          onClick={() => {
            //https://mascocitas.com/sgapi/dig/products?show=price
            //if (isEmpty(path)) return
            fetch(path)
              .then(response => {
                return response.json()
              })
              .then(data => {
                // Work with JSON data here
                Promise.resolve(
                  this.setState({
                    loading: false,
                    total: data.length,
                    current: 0
                  })
                ).then(this.task(data))
              })
              .catch(e => {
                showError(e)
                this.setState({
                  loading: false,
                  list: [],
                  total: 0,
                  current: 0
                })
              })
            this.setState({loading: true})
          }}
          icon="save"
        >
          Obtener productos
        </Button>
      </Spin>
    )
  }
}
