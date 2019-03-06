import React from "react";
import { AutoComplete, Button, Input, Row, Col, Card } from "antd";
import Barcode from "react-barcode";
import { Tags, Wall, Colors, Price, Error, ItemView } from "../controls";
import { validateProduct } from "../util/product";
import { isEmpty } from "../util/general";
import {
  DescHelp,
  NameHelp,
  BarcodeHelp,
  TagsHelp,
  ImagesHelp,
  ColorHelp
} from "../data/help";
import { cardsData, tagsData, colorsData } from "../data/";
const { TextArea } = Input;

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { product = {} } = props;
    const {
      id = 0,
      name = "",
      description = "",
      code = "",
      tags = [],
      images = [],
      colors = [],
      price = {}
    } = product;
    this.state = {
      name,
      description,
      code,
      tags,
      id,
      images,
      colors,
      price
    };
  }

  render() {
    const { dataSource, onSave, onCancel } = this.props;
    let { name, description, code, tags, images, colors, price } = this.state;
    const error = validateProduct(this.state);
    return (
      <Card
        title={
          <ItemView
            onClose={onCancel}
            data={{
              name,
              description,
              images
            }}
          />
        }
      >
        <Row gutter={8}>
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card>
              <NameHelp />
              <AutoComplete
                dataSource={dataSource}
                style={{
                  width: "100%",
                  border: error.name ? "1px solid red" : "none"
                }}
                onSelect={value => console.log("onSelect", value)}
                placeholder="Nómbre del prodúcto"
                onSearch={e => this.setState({ name: e })}
                defaultValue={name}
                allowClear
              />
              <Error list={error.name} />

              <DescHelp />
              <TextArea
                placeholder="Descripción y datos extras del producto"
                autosize={{ minRows: 2, maxRows: 6 }}
                onChange={e => this.setState({ description: e.target.value })}
                defaultValue={description}
              />
              <Error list={error.description} />
              <BarcodeHelp />
              <Input
                defaultValue={code}
                onChange={e =>
                  this.setState({ code: e.target.value.toUpperCase() })
                }
                maxLength={25}
                style={{
                  border: error.code ? "1px solid red" : "none"
                }}
                placeholder="Serial o codigo de barras"
                allowClear
              />
              <Error list={error.code} />
              {code ? (
                <div>
                  <Barcode width={1} height={30} value={code} />
                </div>
              ) : null}
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card>
              <TagsHelp />
              <Tags
                editable
                tags={tags}
                dataSource={tagsData}
                onListChange={t => this.setState({ tags: t })}
              />
              <ImagesHelp />
              <Wall
                editable
                files={images}
                onListChange={t => this.setState({ images: t })}
              />
              <ColorHelp />
              <Colors
                colors={colors}
                editable
                onListChange={c => this.setState({ colors: c })}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Price
              price={price}
              onPriceUpdate={p => this.setState({ price: p })}
            />
          </Col>
        </Row>
        <div>
          <Button
            style={{ float: "left" }}
            onClick={() => {
              if (onSave) {
                onSave(this.state);
              }
            }}
            type="primary"
            icon="upload"
            disabled={!isEmpty(error)}
          >
            Guardar
          </Button>
        </div>
      </Card>
    );
  }
}
