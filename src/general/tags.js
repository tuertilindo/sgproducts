import React from "react"
import {Tag, AutoComplete, Input, Tooltip, Button} from "antd"

export default class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: props.tags || [],
      inputVisible: false,
      editable: props.editable
    }
    this.dataSource = props.dataSource || []
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    const {onListChange, onTagRemoved} = this.props

    if (onTagRemoved && tags.length < this.state.tags.length)
      onTagRemoved(removedTag)
    else if (onListChange) onListChange(tags)
    this.setState({tags})
  }

  showInput = () => {
    this.setState({inputVisible: true})
  }

  handleInputConfirm = tag => {
    const state = this.state
    const {onListChange, onTagAdded} = this.props

    let tags = state.tags
    if (tag && tags.indexOf(tag) === -1) {
      tags = [...tags, tag]

      if (onTagAdded) {
        onTagAdded(tag)
      } else if (onListChange) onListChange(tags)
    }
    this.setState({
      tags,
      inputVisible: false
    })
  }

  render() {
    const {tags, inputVisible, editable} = this.state
    const {style} = this.props
    const dataSource = this.dataSource
    return (
      <span style={style}>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag
              key={tag}
              closable={editable}
              afterClose={() => this.handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {editable && inputVisible && (
          <AutoComplete
            type="text"
            size="small"
            style={{width: 78}}
            onBlur={this.handleInputConfirm}
            onSelect={this.handleInputConfirm}
            dataSource={dataSource}
            autoFocus
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          >
            <Input
              onPressEnter={e => this.handleInputConfirm(e.target.value)}
              maxLength={16}
              placeholder="Tag"
            />
          </AutoComplete>
        )}
        {editable && !inputVisible && (
          <Button
            onClick={this.showInput}
            style={{
              background: "#fff",
              borderStyle: "dashed",
              minWidth: "60px"
            }}
            icon="plus"
            size={"small"}
          />
        )}
      </span>
    )
  }
}
