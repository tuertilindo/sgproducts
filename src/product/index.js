import React from "react"
import {Card, Collapse, Icon, Badge, Button, Alert} from "antd"
import {validateProduct, getStyleByTypeProd} from "./util"
import {showError} from "../general"
import Prodview from "./view"
import ItemInfo from "../mov/itemInfo"
import {
  List as Lista,
  EditableNumber,
  Tags,
  Wall,
  Colors,
  HeaderView,
  isEmpty,
  FieldEditor
} from "../general"
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
    const {onCancel} = this.props
    let {
      name,
      description,
      code,
      tags = [],
      images = [],
      colors = [],
      price = {},
      combo,
      type
    } = this.state
    const {total = 0} = price || {}
    const errors = validateProduct(this.state) || {}
    const items = combo ? combo.subitems || [] : []
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
        <FieldEditor
          fields={{
            name: {
              value: name,
              title: "Nómbre",
              icon: "tag",
              placeholder: "Nómbre del producto"
            },
            description: {
              value: description,
              title: "Descripción",
              icon: "edit",
              placeholder: "Descripción",
              multiline: true
            },
            code: {
              value: code,
              title: "Código o serial",
              icon: "barcode",
              placeholder: "identificador único"
            }
          }}
          errors={errors}
          onChange={o => this.setState(o)}
        />
        <Collapse defaultActiveKey={[]}>
          {type === "combo" ? (
            <Panel
              header={
                <span>
                  <Icon type="tags" /> Producos del combo{" "}
                  {errors["items"] ? (
                    <Icon style={{color: "red"}} type="alert" />
                  ) : null}
                </span>
              }
              key="0"
              extra={
                <Badge
                  showZero
                  count={items.length}
                  style={{
                    backgroundColor:
                      items.length > 0
                        ? items.length > 1
                          ? "#99cc99"
                          : "#cccc99"
                        : "red"
                  }}
                />
              }
            >
              <div>
                <Prodview
                  justSelect
                  onSelect={p =>
                    this.setState({
                      combo: {
                        subitems: [
                          ...items,
                          {
                            count: 1,
                            name: p.name || "desconocido",
                            code: p.code || "desconocido",
                            price: p.price.final || p.total || 0,
                            total: p.price.final || p.total || 0
                          }
                        ]
                      }
                    })
                  }
                />
                <Lista
                  emptyText="Aun no agrego ningún producto"
                  emptyIcon="shopping-cart"
                  items={items}
                  avatar={item => {
                    const {metrica, count} = item
                    return (
                      <EditableNumber
                        suffix={metrica}
                        title="Cambiar la cantidad"
                        count={count}
                        onUpdate={newCount => {
                          for (let i = 0; i < items.length; i++) {
                            if (items[i].code === item.code) {
                              items[i] = {...item, count: newCount}
                              break
                            }
                          }
                          this.setState({combo: {subitems: items}})
                        }}
                      />
                    )
                  }}
                  extraList={[
                    item => (
                      <ItemInfo
                        item={item}
                        action={
                          <Button
                            onClick={() =>
                              this.setState({
                                items: items.filter(i => i.code !== item.code)
                              })
                            }
                            size="small"
                            type="danger"
                          >
                            quitar
                          </Button>
                        }
                      />
                    )
                  ]}
                />
              </div>
              {errors["items"] ? (
                <Alert type="error" message={errors["items"][0]} banner />
              ) : null}
            </Panel>
          ) : null}

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
            window.sgapi.saveEntity(this.state, "products").catch(showError)
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
