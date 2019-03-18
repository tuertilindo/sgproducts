import React from "react"
import {Card, Collapse, Icon, Badge, Button} from "antd"
import {validateProduct, saveProduct, getStyleByTypeProd} from "./util"
import {Tags, Wall, Colors, HeaderView, isEmpty, NameEditor} from "../general"
import PriceEditor from "./priceEditor"
import Price from "./priceView"
const Panel = Collapse.Panel
export default class extends React.Component {
  constructor(props) {
    super(props)
    const {product} = props

    this.state = product || {}
  }

  render() {
    const {dataSource, onSave, onCancel} = this.props
    let {
      name,
      description,
      code,
      tags = [],
      images = [],
      colors = [],
      price = {},
      type
    } = this.state
    const {total = 0} = price || {}
    const errors = validateProduct(this.state) || {}
    return (
      <Card
        title={
          <HeaderView
            onClose={onCancel}
            data={{
              name: type || name,
              description,
              images
            }}
            tag={type}
            tagStyle={getStyleByTypeProd(type).style}
          />
        }
        style={{
          maxWidth: "500px",
          verticalAlign: "top",
          display: "block",
          margin: "auto"
        }}
      >
        <NameEditor
          error={errors}
          name={name}
          description={description}
          code={code}
          onChange={u => this.setState(u)}
        />
        <Collapse defaultActiveKey={[]}>
          <Panel
            header={
              <span>
                <Icon type="dollar" /> Precio{" "}
                {errors["price.total"] ? (
                  <Icon style={{color: "red"}} type="alert" />
                ) : null}
              </span>
            }
            key="1"
            extra={<Price value={total} colored />}
          >
            <PriceEditor
              error={errors["price.total"]}
              price={price}
              onPriceUpdate={p => this.setState({price: p})}
            />
          </Panel>
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
          <Panel
            header={
              <span>
                <Icon type="fire" /> Colores
              </span>
            }
            key="4"
            extra={
              <Badge
                count={colors.length}
                style={{backgroundColor: "#99cc99"}}
              />
            }
          >
            <Colors
              colors={colors}
              editable
              onListChange={c => this.setState({colors: c})}
            />
          </Panel>
        </Collapse>
        <Button
          disabled={!isEmpty(errors)}
          type="primary"
          onClick={() => {
            saveProduct(this.state)
            onCancel()
          }}
          icon="save"
        >
          Guardar
        </Button>
      </Card>
    )
  }
}
