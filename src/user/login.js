import React from "react"
import {Card, Button, Avatar, Spin, Alert} from "antd"
import {validateLoguin} from "./util"
import {HeaderView, isEmpty, FieldEditor, initConfig} from "../general"

export default class extends React.Component {
  constructor(props) {
    super(props)
    const {user} = props

    this.state = user || {}
  }
  componentDidMount() {
    const {onLogin = () => null} = this.props
    setTimeout(
      () =>
        window.sgapi
          .logged()
          .then(x => {
            initConfig()
            onLogin(x)
            this.setState({loading: false})
          })
          .catch(() => {
            onLogin(null)
            this.setState({loading: false})
          }),
      1000
    )
  }

  render() {
    const {onCancel, onLogin} = this.props
    let {email, password, remember, fail, loading} = this.state

    const errors = validateLoguin(this.state) || (fail ? {email: [fail]} : {})
    return (
      <Spin spinning={loading} tip="Iniciando..." delay={200}>
        <Alert
          message="Fake admin"
          description="user: admin@sgcore.com pass: 123456."
          type="warning"
          showIcon
        />
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
                  type: "admin"
                }
                onLogin(usr)
              } else {
                window.sgapi.login(email, password, remember).then(u => {
                  if (u) {
                    onLogin(u)
                    this.setState({loading: false})
                  } else {
                    this.setState({fail: "No te conozco, Bye", loading: false})
                  }
                })
                this.setState({loading: true})
              }
            }}
            icon="save"
          >
            iniciar
          </Button>
        </Card>
      </Spin>
    )
  }
}
