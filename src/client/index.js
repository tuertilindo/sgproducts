import React from "react"
import { Card, Collapse, Icon, Badge, Button } from "antd"
import { validateClient, saveClient } from "./util"
import { Tags, Wall, HeaderView, isEmpty, NameEditor } from "../general"
const Panel = Collapse.Panel
export default class extends React.Component {
  constructor(props) {
    super(props)
    const { client } = props

    this.state = client || {}
    console.log(this.state)
  }

  render() {
    const { dataSource, onSave, onCancel } = this.props
    let { name, description, code, tags = [], images = [], type } = this.state
    const errors = validateClient(this.state) || {}
    return (
      <Card
        title={
          <HeaderView
            onClose={onCancel}
            data={{
              name,
              description,
              images
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
                <Icon type="tags" /> Etiquetas
              </span>
            }
            key="2"
            extra={
              <Badge
                count={tags.length}
                style={{ backgroundColor: "#99cc99" }}
              />
            }
          >
            <Tags
              editable
              tags={tags}
              dataSource={[]}
              onListChange={t => this.setState({ tags: t })}
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
                style={{ backgroundColor: "#99cc99" }}
              />
            }
          >
            <Wall
              editable
              files={images}
              onListChange={t => this.setState({ images: t })}
            />
          </Panel>
        </Collapse>
        <Button
          disabled={!isEmpty(errors)}
          type="primary"
          onClick={() => {
            saveClient(this.state)
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
