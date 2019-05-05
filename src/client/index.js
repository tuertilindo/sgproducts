import React from "react"
import {Card, Collapse, Icon, Badge, Button} from "antd"
import {validateClient, getStyleByClientType} from "./util"
import {
  Tags,
  Wall,
  HeaderView,
  isEmpty,
  FieldEditor,
  showError
} from "../general"
const Panel = Collapse.Panel
export default class extends React.Component {
  constructor(props) {
    super(props)
    const {client} = props

    this.state = client || {}
  }

  render() {
    const {onCancel} = this.props
    let {
      name,
      description,
      code,
      email,
      address,
      phone,
      tags = [],
      images = [],
      type,
      loading
    } = this.state
    const errors =
      validateClient({...this.state, email: email === "" ? null : email}) || {}
    //email must be null
    return (
      <Card
        title={
          <HeaderView
            onClose={onCancel}
            data={{
              name: name || type,
              description: description,
              images
            }}
            tag={type}
            tagStyle={getStyleByClientType(type).style}
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
            description: {
              value: description,
              title: "Descripción",
              icon: "edit",
              placeholder: "Descripción",
              multiline: true
            },
            address: {
              value: address,
              title: "Dirección",
              icon: "home",
              placeholder: "dirección"
            },
            code: {
              value: code,
              title: "CUIT, DNI o código",
              icon: "barcode",
              placeholder: "CUIT"
            },
            phone: {
              value: phone,
              title: "Teléfono",
              icon: "phone",
              placeholder: "teléfono o celular"
            },
            email: {
              value: email,
              title: "Email",
              icon: "inbox",
              placeholder: "correo del usuario"
            }
          }}
          errors={errors}
          onChange={o => this.setState(o)}
        />

        <Collapse defaultActiveKey={[]}>
          <Panel
            header={
              <span>
                <Icon type="tags" /> Etiquetas
              </span>
            }
            key="2"
            extra={
              <Badge count={tags.length} style={{backgroundColor: "#99cc99"}} />
            }
          >
            <Tags
              editable
              tags={tags}
              dataSource={[]}
              onListChange={t => this.setState({tags: t})}
            />
          </Panel>
          <Panel
            header={
              <span>
                <Icon type="picture" /> Imagenes
              </span>
            }
            key="3"
            extra={
              <Badge
                count={images.length}
                style={{backgroundColor: "#99cc99"}}
              />
            }
          >
            <Wall
              editable
              files={images}
              onListChange={t => this.setState({images: t})}
            />
          </Panel>
        </Collapse>
        <Button
          disabled={!isEmpty(errors)}
          type="primary"
          loading={loading}
          onClick={() => {
            Promise.resolve(this.setState({loading: true})).then(() => {
              const {loading, ...other} = this.state
              window.sgapi
                .saveEntity(other, "clients")
                .then(m => {
                  onCancel()
                })
                .catch(e => {
                  showError(e)
                  this.setState({loading: false})
                })
            })
          }}
          icon="save"
        >
          Guardar
        </Button>
      </Card>
    )
  }
}
