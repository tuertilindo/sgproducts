import React from "react"
import {Card, Collapse, Icon, Badge, Button, Alert} from "antd"
import {validateProduct, getStyleByTypeProd, modifyPrice} from "./util"

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
  showError,
  FieldEditor
} from "../general"
import Price from "./priceView"
const Panel = Collapse.Panel

const changeCombo = (items, price) => {
  let final = 0
  for (let i = 0; i < items.length; i++) {
    final += items[i].total
  }
  return {
    combo: {
      subitems: items
    },
    price: modifyPrice(price, {price: {final}})
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    const {product} = props

    this.state = product || {}
  }

  render() {
    const {onClose} = this.props
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
            onClose={onClose}
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
                    this.setState(
                      changeCombo(
                        [
                          //items
                          ...items,
                          {
                            count: 1,
                            name: p.name || "desconocido",
                            code: p.code || "desconocido",
                            price: p.price.final || p.total || 0,
                            total: p.price.final || p.total || 0,
                            iva: p.iva
                          }
                        ],
                        price
                      )
                    )
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
                          this.setState(changeCombo(items, price))
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
                              this.setState(
                                changeCombo(
                                  items.filter(i => i.code !== item.code),
                                  price
                                )
                              )
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
                {errors["price.total"] ? (
                  <Icon style={{color: "red"}} type="alert" />
                ) : null}{" "}
                <Icon
                  type="fire"
                  theme="twoTone"
                  twoToneColor={price.dolarizado ? "#52c41a" : "#1a52c4"}
                />{" "}
                Precio
              </span>
            }
            key="1"
            extra={<Price value={total} colored />}
          >
            <FieldEditor
              fields={{
                dolarizado: {
                  value: price.dolarizado,
                  title: "Precio en dolares",
                  icon: "transaction",
                  on: "Dolar",
                  off: "Pesos",
                  description: " Cambia la moneda"
                },
                cost: {
                  value: price.cost,
                  title: "Precio de costo",
                  icon: "fire",
                  numeric: true,
                  hidden: price.dolarizado
                },
                dolar: {
                  value: price.dolar || 0,
                  title: "Costo en Dolares",
                  icon: "dollar",
                  numeric: true,
                  hidden: !price.dolarizado
                },
                gain: {
                  value: price.gain,
                  title: "Ganancia porcentual",
                  icon: "percentage",
                  numeric: true
                },
                final: {
                  value: price.final,
                  title: "Precio final en pesos",
                  icon: "dollar",
                  numeric: true,
                  hidden: price.dolarizado
                },

                dolarFinal: {
                  value: price.dolarFinal || 0,
                  title: "Precio final en dolares",
                  icon: "dollar",
                  numeric: true,
                  hidden: !price.dolarizado
                },
                cotizacion: {
                  value: price.cotizacion || 1,
                  title: "Cotización",
                  icon: "dollar",
                  numeric: true,
                  hidden: !price.dolarizado
                },
                iva: {
                  value: price.iva,
                  title: "IVA",
                  icon: "percentage",
                  values: ["21", "10.5"]
                }
              }}
              errors={errors}
              onChange={o =>
                this.setState({price: modifyPrice(price, {...price, ...o})})
              }
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
