import React from "react"
import {Modal, Button} from "antd"
import {FieldEditor, isEmpty} from "../general/"
const validate = require("validate.js")
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.targetList = props.target
    this.state = {
      visible: false,
      resetKey: 0
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    this.setState({
      visible: false
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
      resetKey: Math.random()
    })
  }

  render() {
    const {
      constraints,
      onOk,
      okButtonProps,
      modalButtonProps,
      textButton,
      fields,
      ...props
    } = this.props
    const {visible, resetKey, ...other} = this.state
    const errors = constraints
      ? validate(other, constraints, {fullMessages: false})
      : {}

    return (
      <div>
        <Button {...modalButtonProps} onClick={this.showModal}>
          {textButton}
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={() =>
            Promise.resolve(onOk(other)).then(this.setState({visible: false}))
          }
          onCancel={this.handleCancel}
          okButtonProps={{...okButtonProps, disabled: !isEmpty(errors)}}
          {...props}
        >
          <FieldEditor
            key={resetKey}
            fields={fields}
            errors={errors}
            onChange={o => this.setState(o)}
          />
        </Modal>
      </div>
    )
  }
}
