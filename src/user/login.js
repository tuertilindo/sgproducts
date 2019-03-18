import React from "react"
import {Card, Button, Avatar} from "antd"
import {validateLoguin} from "./util"
import {
  HeaderView,
  isEmpty,
  FieldEditor,
  saveEntity,
  getEntities
} from "../general"
export default class extends React.Component {
  constructor(props) {
    super(props)
    const {user} = props

    this.state = user || {}
  }

  render() {
    const {onCancel, onLogin} = this.props
    let {email, password, remember, fail} = this.state

    const errors = validateLoguin(this.state) || (fail ? {email: [fail]} : {})
    return (
      <Card
        title={
          <HeaderView
            onClose={onCancel}
            avatar={<Avatar shape="square" icon="key" />}
            data={{
              name: "Iniciar sesión"
            }}
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
            remember: {
              value: remember,
              on: "Recordarme",
              off: "estoy de paso"
            }
          }}
          errors={errors}
          onChange={o => this.setState({...o, fail: null})}
        />

        <Button
          disabled={!isEmpty(errors)}
          type="primary"
          onClick={() => {
            if ("admin@sgcore.com" === email && "123456" === password) {
              const usr = {
                name: "Fake Admin",
                email: "admin@sgcore.com",
                password: "ad",
                role: "admin"
              }
              if (remember) saveEntity({entity: usr, type: "login", key: email})
              onLogin(usr)
            } else {
              getEntities(
                "users",
                u => u.email === email && u.password === password
              )
                .then(u => {
                  if (u.length > 0) {
                    const usr = u[0]
                    if (remember)
                      saveEntity({entity: usr, type: "login", key: email})
                    onLogin(usr)
                  } else {
                    this.setState({fail: "No te conozco, Bye"})
                  }
                })
                .catch(e => this.setState({fail: e}))
            }
          }}
          icon="save"
        >
          iniciar
        </Button>
      </Card>
    )
  }
}
