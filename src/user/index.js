import React from "react"
import {Card, Button, Avatar} from "antd"
import {validateUser, getStyleByUserType} from "./util"
import {HeaderView, isEmpty, FieldEditor, showError} from "../general"
export default class extends React.Component {
  constructor(props) {
    super(props)
    const {user} = props
    this.state = user || {}
  }
  render() {
    const {onClose} = this.props
    let {name, email, password, type} = this.state
    const errors = validateUser(this.state) || {}
    const {style} = getStyleByUserType(type)
    return (
      <Card
        title={
          <HeaderView
            onClose={onClose}
            avatar={<Avatar shape="square" icon="user" />}
            data={{
              name: "USUARIO"
            }}
            tag={type}
            tagStyle={style}
          />
        }
        style={{
          maxWidth: "500px",
          verticalAlign: "top",
          display: "block",
          margin: "auto"
        }}
      >
        <FieldEditor
          fields={{
            name: {
              value: name,
              title: "Nómbre",
              icon: "tag",
              placeholder: "Nómbre del usuario"
            },
            email: {
              value: email,
              title: "Email",
              icon: "inbox",
              placeholder: "correo del usuario"
            },
            password: {
              value: password,
              title: "Contraseña",
              icon: "key",
              placeholder: "Contraseña",
              password: true
            },
            type: {
              value: type,
              title: "Permiso",
              icon: "security-scan",
              values: ["cliente", "encargado", "contador", "vendedor", "admin"]
            }
          }}
          errors={errors}
          onChange={o => this.setState(o)}
        />

        <Button
          disabled={!isEmpty(errors)}
          type="primary"
          onClick={() => {
            window.sgapi.saveEntity(this.state, "users").catch(showError)
            onClose()
          }}
          icon="save"
        >
          Guardar
        </Button>
      </Card>
    )
  }
}
