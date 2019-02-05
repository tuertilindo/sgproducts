import React from "react";
import { AutoComplete, Popover, Button, Input, Row, Col } from "antd";
import Barcode from "react-barcode";
import { Tags, Wall, Colors, Price } from "../controls";
import Conn from "../data/cnn";
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
const cnn = new Conn();

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
      colors = []
    } = product;
    this.state = {
      name,
      description,
      code,
      tags,
      id,
      images,
      colors
    };
  }
  onSelect(value) {
    console.log("onSelect", value);
  }

  render() {
    const { dataSource, onSave, onCancel } = this.props;
    let { name, description, code, tags, images, colors } = this.state;
    return (
      <div>
        <Row gutter={8}>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <NameHelp />
            <AutoComplete
              dataSource={dataSource}
              style={{ width: 250 }}
              onSelect={this.onSelect}
              placeholder="Nómbre del prodúcto"
              onSearch={e => this.setState({ name: e })}
              defaultValue={name}
              allowClear
            />

            <DescHelp />
            <TextArea
              style={{ width: 250 }}
              placeholder="Descripción y datos extras del producto"
              autosize={{ minRows: 2, maxRows: 6 }}
              onChange={e => this.setState({ description: e.target.value })}
              defaultValue={description}
            />

            <BarcodeHelp />
            <Input
              defaultValue={code}
              onChange={e =>
                this.setState({ code: e.target.value.toUpperCase() })
              }
              maxLength={20}
              style={{ width: 250 }}
              placeholder="Serial o codigo de barras"
              allowClear
            />

            {code ? (
              <div>
                <Barcode width={1} height={30} value={code} />
              </div>
            ) : null}
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <TagsHelp />
            <Tags
              editable
              tags={tags}
              dataSource={tagsData}
              onListChange={t => this.setState({ tags: t })}
            />
            <ImagesHelp />
            <Wall editable files={images} />
            <ColorHelp />
            <Colors
              colors={colors}
              editable
              onListChange={c => this.setState({ colors: c })}
            />
          </Col>
        </Row>
        <div>
          <Button
            style={{ float: "left" }}
            onClick={() => {
              const p = cnn.save(this.state);
              if (onSave) {
                onSave(p);
              }
            }}
            type="primary"
            icon="upload"
          >
            Guardar
          </Button>
          <Button
            style={{ float: "right" }}
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
            }}
            icon="cancel"
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }
}
